package com.manager.mountainview.domain.review;


import com.manager.mountainview.domain.mountain.Mountain;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findAllDescByMountain(Mountain mountain, Pageable pageable);
}
