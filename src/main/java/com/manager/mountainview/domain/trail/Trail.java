package com.manager.mountainview.domain.trail;

import com.manager.mountainview.domain.mountain.Mountain;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.awt.geom.Point2D;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Trail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private double length;

    private String difficult;

    // 상행시간
    private int uppl;
    // 하행시간
    private int godn;
    // 통제여부
    private char cnrl;
    // 폐쇄여부
    private char cls;
    // 위험구간내용
    private String risk;
    // 등산로 시작좌표
    @Column(name = "startp")
    private Point2D.Double start;
    // 등산로 끝좌표
    @Column(name = "endp")
    private Point2D.Double end;

    private String type;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "mountain_id")
    private Mountain mountain;

    @Builder
    public Trail(String name, int length, String difficult, int uppl, int godn,
        char cnrl, char cls, String risk, Point2D.Double start, Point2D.Double end, String type, Mountain mountain) {
        this.name = name;
        this.length = length;
        this.difficult = difficult;
        this.uppl = uppl;
        this.godn = godn;
        this.cnrl = cnrl;
        this.cls = cls;
        this.risk = risk;
        this.start = start;
        this.end = end;
        this.type = type;
        this.mountain = mountain;
    }
}
