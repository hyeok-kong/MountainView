package com.manager.mountainview.application.api;

import com.manager.mountainview.application.dto.request.MountainRequestDto;
import com.manager.mountainview.application.dto.response.MountainDetailResponseDto;
import com.manager.mountainview.application.dto.response.MountainResponseDto;
import com.manager.mountainview.application.dto.response.SpotResponseDto;
import com.manager.mountainview.application.dto.response.TrailResponseDto;
import com.manager.mountainview.application.service.MountainService;
import com.manager.mountainview.application.service.SpotService;
import com.manager.mountainview.application.service.TrailService;
import com.manager.mountainview.domain.mountain.Mountain;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class MountainApiController {
    private final MountainService mountainService;
    private final SpotService spotService;
    private final TrailService trailService;

    @PostMapping("/api/mountain")
    public Long save(@RequestBody MountainRequestDto requestDto) {
        return mountainService.save(requestDto);
    }

    @GetMapping("/api/mountain")
    public List<MountainResponseDto> findAll() {
        return mountainService.findAllMountain();
    }

    @GetMapping("/api/mountain/{code}/details")
    public MountainDetailResponseDto getMountainDetail(@PathVariable String code) {
        Mountain mountain = mountainService.findByCode(code);
        List<SpotResponseDto> spots = spotService.findSpotByMountain(mountain);
        List<TrailResponseDto> trails = trailService.findTrailByMountain(mountain);
        MountainResponseDto mountainDto = new MountainResponseDto(mountain);

        ResponseEntity<Object> result = mountainService.getMountainDetails(mountain.getName());

        return MountainDetailResponseDto.builder()
                .mountain(mountainDto)
                .spots(spots)
                .trails(trails)
                .result(result)
                .build();
    }
}