package com.manager.mountainview.application.api;

import com.manager.mountainview.application.dto.response.MountainDetailResponseDto;
import com.manager.mountainview.application.dto.response.MountainResponseDto;
import com.manager.mountainview.application.dto.response.SpotResponseDto;
import com.manager.mountainview.application.dto.response.TrailResponseDto;
import com.manager.mountainview.application.service.MountainService;
import com.manager.mountainview.application.service.SpotService;
import com.manager.mountainview.application.service.TrailService;
import com.manager.mountainview.domain.mountain.Mountain;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class MountainApiController {
    private final MountainService mountainService;
    private final SpotService spotService;
    private final TrailService trailService;

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

        return MountainDetailResponseDto.builder()
                .mountain(mountainDto)
                .spots(spots)
                .trails(trails)
                .build();
    }
}
