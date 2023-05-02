package com.manager.mountainview.application.service;

import com.manager.mountainview.domain.mountain.Mountain;
import lombok.RequiredArgsConstructor;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.DefaultUriBuilderFactory;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@PropertySource("classpath:application-oauth.properties")
@RequiredArgsConstructor
@Service
public class WeatherService {
    @Value("${serviceKey}")
    private String serviceKey;
    private final MountainService mountainService;

    // 필요한 데이터만 뽑아내서 반환
    // 현재는 POP(강수확률), TMP(1시간 기온)을 뽑아냄
    public JSONObject weatherParser(String jsonStr) {
        JSONObject result = new JSONObject();

        //현재 시간
        LocalTime now = LocalTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH");
        String time = now.format(formatter);
        time += "00";

        // 필요한 데이터만 뽑아내기
        try {
            JSONParser jsonParser = new JSONParser();
            JSONObject jsonObj = (JSONObject) jsonParser.parse(jsonStr);

            JSONObject response = (JSONObject) jsonObj.get("response");
            JSONObject body = (JSONObject) response.get("body");
            JSONObject items = (JSONObject) body.get("items");

            JSONArray itemArray = (JSONArray) items.get("item");

            JSONArray jsonArray = new JSONArray();
            for (int i = 0; i < itemArray.size(); i++) {
                JSONObject element = (JSONObject) itemArray.get(i);

                // 강수확률, 현재기온만
                if (element.get("category").equals("POP") || element.get("category").equals("TMP")) {
                    // 현재 시간에 일치하는 데이터만
                    if (element.get("fcstTime").equals(time))
                        jsonArray.add(element);
                }
            }
            result.put("result", jsonArray);

        } catch (ParseException e) {
            e.printStackTrace();
        }

        return result;
    }

    public JSONObject getMountainWeather(String code) {
        JSONObject result;

        //파라미터 인코딩
        String base_url = "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0";
        DefaultUriBuilderFactory factory = new DefaultUriBuilderFactory(base_url);
        factory.setEncodingMode(DefaultUriBuilderFactory.EncodingMode.VALUES_ONLY);


        WebClient wc = WebClient.builder()
                .uriBuilderFactory(factory)
                .baseUrl(base_url)
                .build();

        // 웹클라이언트로 요청
        // 서비스키의 경우 인코딩 된 값이 달라져 호출 시 에러 발생
        // uriBuilder로 생성하여 에러 해결
        String response = wc.get()
                .uri(uriBuilder -> uriBuilder.path("/getVilageFcst")
                        .queryParam("serviceKey", serviceKey)
                        .queryParam(getWeatherUrl(code))
                        .build())
                .retrieve().bodyToMono(String.class).block();

        result = weatherParser(response);

        return result;
    }

    public String getWeatherUrl(String code) {
        String url = "";
        String pageNo = "1";
        String numOfRows = "36";
        String dataType = "JSON";
        String base_date;
        String base_time;
        String nx = "55";
        String ny = "127";

        //현재 날짜 yyyyMMdd 포맷으로 변경
        LocalDate date = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        base_date = date.format(formatter);

        //현재 시간 00(00시) 포맷으로 변경
        LocalTime time = LocalTime.now();
        formatter = DateTimeFormatter.ofPattern("HH");
        base_time = time.format(formatter);

        // 기상청 업데이트 시간에 맞춰 변경
        int btime = Integer.parseInt(base_time);

        //00시 ~ 02시라면 어제 23시의 날씨를 요청
        if (btime < 2) {
            base_date = date.minusDays(1).format(formatter);
            btime = 23;
        } else {
            btime = (btime / 3) * 3 - 1;
        }

        base_time = Integer.toString(btime);

        if(base_time.length() == 1) {
            base_time = "0" + base_time;
        }

        base_time += "00";

        // 산 좌표 변경
        Mountain mountain = mountainService.findByCode(code);
        Double posx = mountain.getLocation().getX();
        Double posy = mountain.getLocation().getY();

        LatXLngY pos = convertToGrid(posx, posy);

        Double tempx = new Double(pos.x);
        Double tempy = new Double(pos.y);

        nx = Integer.toString(tempx.intValue());
        ny = Integer.toString(tempy.intValue());

        url += "&pageNo=" + pageNo;
        url += "&numOfRows=" + numOfRows;
        url += "&dataType=" + dataType;
        url += "&base_date=" + base_date;
        url += "&base_time=" + base_time;
        url += "&nx=" + nx + "&ny=" + ny;

        return url;
    }

    private LatXLngY convertToGrid(Double lat_X, Double lng_Y) {
        double RE = 6371.00877; // 지구 반경(km)
        double GRID = 5.0; // 격자 간격(km)
        double SLAT1 = 30.0; // 투영 위도1(degree)
        double SLAT2 = 60.0; // 투영 위도2(degree)
        double OLON = 126.0; // 기준점 경도(degree)
        double OLAT = 38.0; // 기준점 위도(degree)
        double XO = 43; // 기준점 X좌표(GRID)
        double YO = 136; // 기1준점 Y좌표(GRID)

        //
        // LCC DFS 좌표변환 (위경도->좌표, lat_X:위도,  lng_Y:경도)
        //


        double DEGRAD = Math.PI / 180.0;
        double RADDEG = 180.0 / Math.PI;

        double re = RE / GRID;
        double slat1 = SLAT1 * DEGRAD;
        double slat2 = SLAT2 * DEGRAD;
        double olon = OLON * DEGRAD;
        double olat = OLAT * DEGRAD;

        double sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
        sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
        double sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
        sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;
        double ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
        ro = re * sf / Math.pow(ro, sn);
        LatXLngY rs = new LatXLngY();

        rs.lat = lat_X;
        rs.lng = lng_Y;
        double ra = Math.tan(Math.PI * 0.25 + (lat_X) * DEGRAD * 0.5);
        ra = re * sf / Math.pow(ra, sn);
        double theta = lng_Y * DEGRAD - olon;
        if (theta > Math.PI) theta -= 2.0 * Math.PI;
        if (theta < -Math.PI) theta += 2.0 * Math.PI;
        theta *= sn;
        rs.x = Math.floor(ra * Math.sin(theta) + XO + 0.5);
        rs.y = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);

        return rs;
    }
}

class LatXLngY {
    public double lat;
    public double lng;

    public double x;
    public double y;
}