package com.manager.mountainview.application.dto.response;

import com.manager.mountainview.domain.trail.Trail;
import lombok.Builder;
import lombok.Getter;

import java.awt.geom.Point2D;

@Getter
public class TrailResponseDto {
    private Long id;
    private String name;

    private double length;

    private String difficult;

    private int uppl;

    private int godn;

    private char cnrl;

    private char cls;

    private String risk;

    private Point2D.Double startp;

    private Point2D.Double endp;

    private String type;

    @Builder
    public TrailResponseDto(Trail entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.length = entity.getLength();
        this.difficult = entity.getDifficult();
        this.uppl = entity.getUppl();
        this.godn = entity.getGodn();
        this.cnrl = entity.getCnrl();
        this.cls = entity.getCls();
        this.risk = entity.getRisk();
        this.startp = entity.getStart();
        this.endp = entity.getEnd();
        this.type = entity.getType();
    }
}
