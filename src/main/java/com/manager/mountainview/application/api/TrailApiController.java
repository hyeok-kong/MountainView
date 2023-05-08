package com.manager.mountainview.application.api;

import com.manager.mountainview.application.dto.request.TrailRequestDto;
import com.manager.mountainview.application.dto.response.TrailResponseDto;
import com.manager.mountainview.application.service.MountainService;
import com.manager.mountainview.application.service.TrailService;
import com.manager.mountainview.domain.mountain.Mountain;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class TrailApiController {
    private final MountainService mountainService;
    private final TrailService trailService;

//    @PostMapping("/api/trail")
//    public Long save(@RequestBody TrailRequestDto requestDto) {
//        return trailService.save(requestDto);
//    }

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
