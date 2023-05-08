package com.manager.mountainview.application.dto.request;

import com.manager.mountainview.domain.mountain.Mountain;
import com.manager.mountainview.domain.trail.Trail;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.awt.geom.Point2D;

@Getter
@NoArgsConstructor
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

    @Builder
    public TrailRequestDto(String name, double length, String difficult, int uppl, int godn, char cnrl,
                           char cls, String risk, Double startx, Double starty, Double endx, Double endy, String code, String type) {
        this.name = name;
        this.length = length;
        this.difficult = difficult;
        this.uppl = uppl;
        this.godn = godn;
        this.cnrl = cnrl;
        this.cls = cls;
        this.risk = risk;
        this.startx = startx;
        this.starty = starty;
        this.endx = endx;
        this.endy = endy;
        this.code = code;
        this.type = type;
    }
}
