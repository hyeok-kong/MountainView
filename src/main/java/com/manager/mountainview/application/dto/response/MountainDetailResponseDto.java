package com.manager.mountainview.application.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class MountainDetailResponseDto {
    private MountainResponseDto mountain;
    private List<SpotResponseDto> spots;
    private List<TrailResponseDto> trails;

    @Builder
    public MountainDetailResponseDto(MountainResponseDto mountain, List<SpotResponseDto> spots, List<TrailResponseDto> trails) {
        this.mountain = mountain;
        this.spots = spots;
        this.trails = trails;
    }
}
