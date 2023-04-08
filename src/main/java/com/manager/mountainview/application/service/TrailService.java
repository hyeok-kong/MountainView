package com.manager.mountainview.application.service;


import com.manager.mountainview.application.dto.request.TrailRequestDto;
import com.manager.mountainview.application.dto.response.TrailResponseDto;
import com.manager.mountainview.domain.mountain.Mountain;
import com.manager.mountainview.domain.trail.TrailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class TrailService {
    private final TrailRepository trailRepository;

    @Transactional
    public Long save(TrailRequestDto requestDto) {
        return trailRepository.save(requestDto.toEntity()).getId();
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
