package com.manager.mountainview.application.service;

import com.manager.mountainview.application.dto.request.MountainRequestDto;
import com.manager.mountainview.application.dto.response.MountainResponseDto;
import com.manager.mountainview.domain.mountain.Mountain;
import com.manager.mountainview.domain.mountain.MountainRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class MountainService {

    private final MountainRepository mountainRepository;



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
