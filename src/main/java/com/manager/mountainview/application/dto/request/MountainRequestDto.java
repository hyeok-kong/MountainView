package com.manager.mountainview.application.dto.request;

import com.manager.mountainview.domain.mountain.Mountain;
import lombok.Getter;

import java.awt.geom.Point2D;

@Getter
public class MountainRequestDto {
    private String code;
    private String name;
    private Point2D.Double location;

    public MountainRequestDto(String code, String name, Point2D.Double location) {
        this.code = code;
        this.name = name;
        this.location = location;
    }

    public Mountain toEntity() {
        return new Mountain().builder()
                .code(code)
                .name(name)
                .location(location)
                .build();
    }
}
