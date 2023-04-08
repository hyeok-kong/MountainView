package com.manager.mountainview.application.dto.response;

import com.manager.mountainview.domain.mountain.Mountain;
import lombok.Getter;

import java.awt.geom.Point2D;

@Getter
public class MountainResponseDto {
    private Long id;
    private String code;
    private String name;
    private Point2D.Double location;


    public MountainResponseDto(Mountain entity) {
        this.id = entity.getId();
        this.code = entity.getCode();
        this.name = entity.getName();
        this.location = entity.getLocation();
    }
}
