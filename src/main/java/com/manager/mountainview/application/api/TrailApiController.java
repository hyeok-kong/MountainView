package com.manager.mountainview.application.api;

import com.manager.mountainview.application.dto.response.TrailResponseDto;
import com.manager.mountainview.application.service.MountainService;
import com.manager.mountainview.application.service.TrailService;
import com.manager.mountainview.domain.mountain.Mountain;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class TrailApiController {
    private final MountainService mountainService;
    private final TrailService trailService;

    @GetMapping("/api/trails")
    public List<TrailResponseDto> findAllSpot() {
        return trailService.findAllTrail();
    }

    @GetMapping("/api/trails/{code}")
    public List<TrailResponseDto> findByMountain(@PathVariable String code) {
        Mountain mountain = mountainService.findByCode(code);
        return trailService.findTrailByMountain(mountain);
    }
}
