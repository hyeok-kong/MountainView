package com.manager.mountainview.domain.spot;


import com.manager.mountainview.domain.mountain.Mountain;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;
import org.locationtech.jts.geom.Point;

import javax.persistence.*;
import java.awt.geom.Point2D;

@Getter
@NoArgsConstructor
@Entity
public class Spot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    //h2에서 Point2D 사용 위한 설정
    @Column(nullable = false)
    private Point2D.Double location;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "mountain_id")
    private Mountain mountain;

    @Builder
    public Spot(String name, Point2D.Double location, Mountain mountain) {
        this.name = name;
        this.location = location;
        this.mountain = mountain;
    }
}
