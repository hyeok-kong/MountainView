package com.manager.mountainview.application.api;

import com.manager.mountainview.application.dto.request.SpotRequestDto;
import com.manager.mountainview.application.dto.response.SpotResponseDto;
import com.manager.mountainview.application.service.MountainService;
import com.manager.mountainview.application.service.SpotService;
import com.manager.mountainview.domain.mountain.Mountain;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class SpotApiController {
    private final MountainService mountainService;
    private final SpotService spotService;

//    @PostMapping("/api/spot")
//    public Long save(@RequestBody SpotRequestDto requestDto) {
//        return spotService.save(requestDto);
//    }

    @GetMapping("/api/spots")
    public List<SpotResponseDto> findAllSpot() {
        return spotService.findAllSpot();
    }

    @GetMapping("/api/spots/{code}")
    public List<SpotResponseDto> findByMountain(@PathVariable String code) {
        Mountain mountain = mountainService.findByCode(code);
        return spotService.findSpotByMountain(mountain);
    }
}