package com.manager.mountainview.application.dto.response;

import lombok.Builder;
import lombok.Getter;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class MountainDetailResponseDto {
    private MountainResponseDto mountain;
    private List<SpotResponseDto> spots;
    private List<TrailResponseDto> trails;
    private ResponseEntity<Object> result;

    @Builder
    public MountainDetailResponseDto(MountainResponseDto mountain, List<SpotResponseDto> spots,
                                     List<TrailResponseDto> trails, ResponseEntity<Object> result) {
        this.mountain = mountain;
        this.spots = spots;
        this.trails = trails;
        this.result = result;
    }
}
