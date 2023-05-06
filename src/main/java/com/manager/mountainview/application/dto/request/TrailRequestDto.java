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

    private Double startx;
    private Double starty;

    private Double endx;
    private Double endy;

    private String code;

    private String type;
}
