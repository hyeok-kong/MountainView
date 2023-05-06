package com.manager.mountainview.application.service;

import com.manager.mountainview.application.dto.request.SpotRequestDto;
import com.manager.mountainview.application.dto.response.SpotResponseDto;
import com.manager.mountainview.domain.mountain.Mountain;
import com.manager.mountainview.domain.spot.Spot;
import com.manager.mountainview.domain.spot.SpotRepository;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.DefaultUriBuilderFactory;

import java.awt.geom.Point2D;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SpotService {
    private final SpotRepository spotRepository;
    private final MountainService mountainService;

    public String locParser(String jsonStr, int mode) {
        String result = "";

        try {
            JSONParser jsonParser = new JSONParser();
            JSONObject jsonObj = (JSONObject) jsonParser.parse(jsonStr);

            JSONObject res = (JSONObject) jsonObj.get("result");
            if(mode == 1) {
                result = res.get("posX").toString();
            } else {
                result = res.get("posY").toString();
            }

        } catch (ParseException e) {
            e.printStackTrace();
        }

        return result;
    }

    @Transactional
    public Long save(SpotRequestDto requestDto) {
        JSONObject result;

        String accessToken = "549f84f4-cfb5-46d3-ab98-401978826bf4";
        String base_url = "https://sgisapi.kostat.go.kr";

        DefaultUriBuilderFactory factory = new DefaultUriBuilderFactory(base_url);
        factory.setEncodingMode(DefaultUriBuilderFactory.EncodingMode.VALUES_ONLY);

        WebClient wc = WebClient.builder()
                .uriBuilderFactory(factory)
                .baseUrl(base_url)
                .build();

        String response = wc.get()
                .uri(uriBuilder -> uriBuilder.path("/OpenAPI3/transformation/transcoord.json?src=5186&dst=4326&posX="+ requestDto.getPosx() + "&posY=" + requestDto.getPosy() + "&accessToken=" + accessToken)
                        .build())
                .retrieve().bodyToMono(String.class).block();

        Double posx = Double.parseDouble(locParser(response, 1));
        Double posy = Double.parseDouble(locParser(response, 2));

        Point2D.Double location = new Point2D.Double(posx, posy);

        Spot spot = Spot.builder()
                .name(requestDto.getName())
                .location(location)
                .mountain(mountainService.findByCode(requestDto.getCode()))
                .build();

        return spotRepository.save(spot).getId();
    }

    @Transactional
    public List<SpotResponseDto> findAllSpot() {
        return spotRepository.findAll().stream()
                .map(SpotResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public List<SpotResponseDto> findSpotByMountain(Mountain mountain) {
        return spotRepository.findSpotByMountain(mountain).stream()
                .map(SpotResponseDto::new)
                .collect(Collectors.toList());
    }
}
