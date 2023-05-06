package com.manager.mountainview.application.service;


import com.manager.mountainview.application.dto.request.TrailRequestDto;
import com.manager.mountainview.application.dto.response.TrailResponseDto;
import com.manager.mountainview.domain.mountain.Mountain;
import com.manager.mountainview.domain.spot.Spot;
import com.manager.mountainview.domain.trail.Trail;
import com.manager.mountainview.domain.trail.TrailRepository;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.DefaultUriBuilderFactory;

import java.awt.geom.Point2D;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class TrailService {
    private final TrailRepository trailRepository;
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
    public Long save(TrailRequestDto requestDto) {
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
                .uri(uriBuilder -> uriBuilder.path("/OpenAPI3/transformation/transcoord.json?src=5186&dst=4326&posX="+ requestDto.getStartx() + "&posY=" + requestDto.getStarty() + "&accessToken=" + accessToken)
                        .build())
                .retrieve().bodyToMono(String.class).block();

        Double startx = Double.parseDouble(locParser(response, 1));
        Double starty = Double.parseDouble(locParser(response, 2));

        response = wc.get()
                .uri(uriBuilder -> uriBuilder.path("/OpenAPI3/transformation/transcoord.json?src=5186&dst=4326&posX="+ requestDto.getEndx() + "&posY=" + requestDto.getEndy() + "&accessToken=" + accessToken)
                        .build())
                .retrieve().bodyToMono(String.class).block();

        Double endx = Double.parseDouble(locParser(response, 1));
        Double endy = Double.parseDouble(locParser(response, 2));

        Point2D.Double start = new Point2D.Double(startx, starty);
        Point2D.Double end = new Point2D.Double(endx, endy);

        Trail trail = Trail.builder()
                .name(requestDto.getName())
                .length(requestDto.getLength())
                .difficult(requestDto.getDifficult())
                .uppl(requestDto.getUppl())
                .godn(requestDto.getGodn())
                .cnrl(requestDto.getCnrl())
                .cls(requestDto.getCls())
                .risk(requestDto.getRisk())
                .start(start)
                .end(end)
                .type(requestDto.getType())
                .mountain(mountainService.findByCode(requestDto.getCode()))
                .build();


        return trailRepository.save(trail).getId();
    }

    @Transactional
    public List<TrailResponseDto> findAllTrail() {
        return trailRepository.findAll().stream()
                .map(TrailResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public List<TrailResponseDto> findTrailByMountain(Mountain mountain) {
        return trailRepository.findTrailByMountain(mountain).stream()
                .map(TrailResponseDto::new)
                .collect(Collectors.toList());
    }
}
