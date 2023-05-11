package com.manager.mountainview.application.service;

import com.manager.mountainview.application.dto.request.MountainRequestDto;
import com.manager.mountainview.application.dto.response.MountainResponseDto;
import com.manager.mountainview.domain.mountain.Mountain;
import com.manager.mountainview.domain.mountain.MountainRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@PropertySource("classpath:application-oauth.properties")
@RequiredArgsConstructor
@Service
public class MountainService {
    @Value("${serviceKey}")
    private String serviceKey;

    private final MountainRepository mountainRepository;

    public ResponseEntity<Object> getMountainDetails(String name) {
        HashMap<String, Object> result = new HashMap<String, Object>();
        ResponseEntity<Object> resultMap = new ResponseEntity<>(null,null,200);
        String url = "http://api.forest.go.kr/openapi/service/cultureInfoService" +
                "/gdTrailInfoOpenAPI?serviceKey=" + serviceKey +
                "&searchMtNm=" + name + "&pageNo=1&numOfRows=10";

        try {
            RestTemplate restTemplate = new RestTemplate();

            HttpHeaders header = new HttpHeaders();
            HttpEntity<?> entity = new HttpEntity<>(header);
            UriComponents uri = UriComponentsBuilder.fromHttpUrl(url).build();

            resultMap = restTemplate.exchange(uri.toString(), HttpMethod.GET, entity, Object.class);

            result.put("statusCode", resultMap.getStatusCodeValue()); //http status code를 확인
            result.put("header", resultMap.getHeaders()); //헤더 정보 확인
            result.put("body", resultMap.getBody()); //실제 데이터 정보 확인

            //에러처리해야댐
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            result.put("statusCode", e.getRawStatusCode());
            result.put("body"  , e.getStatusText());
            System.out.println("error");
            System.out.println(e.toString());

            return resultMap;
        }
        catch (Exception e) {
            result.put("statusCode", "999");
            result.put("body"  , "excpetion오류");
            System.out.println(e.toString());

            return resultMap;
        }

        return resultMap;
    }

    // for inner service
    @Transactional
    public Mountain findByCode(String code) {
        Mountain mountain = mountainRepository.findByCode(code).orElseThrow(() ->
                new IllegalArgumentException("해당 산이 없습니다. code : " + code));

        return mountain;
    }

    // for outter api
    @Transactional
    public MountainResponseDto findMountainByCode(String code) {
        Mountain mountain = mountainRepository.findByCode(code).orElseThrow(() ->
                new IllegalArgumentException("해당 산이 없습니다. code : " + code));

        return new MountainResponseDto(mountain);
    }

    @Transactional
    public List<MountainResponseDto> findAllMountain() {
        return mountainRepository.findAll().stream()
                .map(MountainResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public Long save(@RequestBody MountainRequestDto mountainDto) {
        return mountainRepository.save(mountainDto.toEntity()).getId();
    }
}
