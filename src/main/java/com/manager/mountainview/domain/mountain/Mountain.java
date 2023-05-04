package com.manager.mountainview.domain.mountain;

import com.manager.mountainview.domain.spot.Spot;
import com.manager.mountainview.domain.trail.Trail;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.awt.geom.Point2D;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
public class Mountain {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String code;

    @Column(nullable = false)
    private String name;

    @Column
    private Point2D.Double location;

    @OneToMany(mappedBy = "mountain")
    private List<Spot> spots = new ArrayList<>();

    @OneToMany(mappedBy = "mountain")
    private List<Trail> trails = new ArrayList<>();

    @Builder
    public Mountain(String code, String name, Point2D.Double location) {
        this.code = code;
        this.name = name;
        this.location = location;
    }
}
