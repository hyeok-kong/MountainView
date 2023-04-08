package com.manager.mountainview.domain.trail;

import com.manager.mountainview.domain.mountain.Mountain;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrailRepository extends JpaRepository<Trail, Long> {
    List<Trail> findTrailByMountain(Mountain mountain);
}
