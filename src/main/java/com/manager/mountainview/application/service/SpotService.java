package com.manager.mountainview.application.service;

import com.manager.mountainview.application.dto.request.SpotRequestDto;
import com.manager.mountainview.application.dto.response.SpotResponseDto;
import com.manager.mountainview.domain.mountain.Mountain;
import com.manager.mountainview.domain.spot.SpotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SpotService {
    private final SpotRepository spotRepository;

    @Transactional
    public Long save(SpotRequestDto requestDto) {
        return spotRepository.save(requestDto.toEntity()).getId();
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
