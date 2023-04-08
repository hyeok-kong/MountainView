package com.manager.mountainview.application.dto.request;

import com.manager.mountainview.domain.mountain.Mountain;
import com.manager.mountainview.domain.spot.Spot;
import lombok.Builder;
import lombok.Getter;

import java.awt.geom.Point2D;

@Getter
public class SpotRequestDto {
    private String name;
    private Point2D.Double location;
    private Mountain mountain;

    @Builder
    public SpotRequestDto(String name, Point2D.Double location, Mountain mountain) {
        this.name = name;
        this.location = location;
        this.mountain = mountain;
    }


    public Spot toEntity() {
        return new Spot().builder()
                .name(name)
                .location(location)
                .mountain(mountain)
                .build();
    }
}
