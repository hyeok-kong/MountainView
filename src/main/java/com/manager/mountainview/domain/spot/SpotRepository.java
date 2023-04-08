package com.manager.mountainview.domain.spot;

import com.manager.mountainview.domain.mountain.Mountain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SpotRepository extends JpaRepository<Spot, Long> {
    List<Spot> findSpotByMountain(Mountain mountain);
}
