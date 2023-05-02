package com.manager.mountainview.application.service;


import com.manager.mountainview.application.dto.request.ReviewRequestDto;
import com.manager.mountainview.application.dto.response.ReviewResponseDto;
import com.manager.mountainview.domain.mountain.Mountain;
import com.manager.mountainview.domain.review.Review;
import com.manager.mountainview.domain.review.ReviewRepository;
import com.manager.mountainview.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final MountainService mountainService;
    private final UserService userService;

    @Transactional
    public List<ReviewResponseDto> findReviewByMountainCode(String code, Pageable pageable) {
        Mountain mountain = mountainService.findByCode(code);
        return reviewRepository.findAllDescByMountain(mountain, pageable).stream()
                .map(ReviewResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public Long save(ReviewRequestDto dto) {
        Mountain mountain = mountainService.findByCode(dto.getCode());

        User user = userService.findById(dto.getUserid());

        Review review = Review.builder()
                .score(dto.getScore())
                .content(dto.getContent())
                .user(user)
                .mountain(mountain)
                .build();

        return reviewRepository.save(review).getId();
    }

    @Transactional
    public Long update(Long id, ReviewRequestDto dto) {
        Review review = reviewRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException("해당 리뷰가 없습니다. id : " + id));

        if(review.getUser().getId() == dto.getUserid()) {
            review.update(dto.getScore(), dto.getContent());
        }

        return id;
    }

    @Transactional
    public void delete(Long id) {
        Review review = reviewRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException("해당 리뷰가 없습니다. id : " + id));

        reviewRepository.delete(review);
    }
}
