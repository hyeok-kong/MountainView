package com.manager.mountainview.application.dto.request;

import com.manager.mountainview.domain.mountain.Mountain;
import com.manager.mountainview.domain.spot.Spot;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.awt.geom.Point2D;

@Getter
@NoArgsConstructor
public class SpotRequestDto {
    private String name;
    private Double posx;
    private Double posy;
    private String code;

    @Builder
    public SpotRequestDto(String name, Double posx, Double posy, String code) {
        this.name = name;
        this.posx = posx;
        this.posy = posy;
        this.code = code;
    }
}
