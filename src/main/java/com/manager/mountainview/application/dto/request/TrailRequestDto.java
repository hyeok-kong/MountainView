package com.manager.mountainview.application.dto.request;

import com.manager.mountainview.domain.mountain.Mountain;
import com.manager.mountainview.domain.trail.Trail;
import lombok.Builder;
import lombok.Getter;

import java.awt.geom.Point2D;

@Getter
@Builder
public class TrailRequestDto {
    private String name;

    private double length;

    private String difficult;

    private int uppl;

    private int godn;

    private char cnrl;

    private char cls;

    private String risk;

    private Point2D.Double start;

    private Point2D.Double end;

    private Mountain mountain;

    public Trail toEntity() {
        Trail trail = Trail.builder()
                .name(name)
                .length(length)
                .difficult(difficult)
                .uppl(uppl)
                .godn(godn)
                .cnrl(cnrl)
                .cls(cls)
                .risk(risk)
                .start(end)
                .end(end)
                .mountain(mountain)
                .build();

        return trail;
    }
}
