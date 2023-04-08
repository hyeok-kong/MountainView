package com.manager.mountainview.application.dto.response;

import com.manager.mountainview.domain.spot.Spot;
import lombok.Getter;

import java.awt.geom.Point2D;

@Getter
public class SpotResponseDto {
    private Long id;
    private String name;
    private Point2D.Double location;


    public SpotResponseDto(Spot entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.location = entity.getLocation();
    }
}
