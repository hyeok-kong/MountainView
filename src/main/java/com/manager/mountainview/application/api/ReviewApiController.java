package com.manager.mountainview.application.api;

import com.manager.mountainview.application.dto.request.ReviewRequestDto;
import com.manager.mountainview.application.dto.response.ReviewResponseDto;
import com.manager.mountainview.application.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class ReviewApiController {
    private final ReviewService reviewService;
    @GetMapping("/api/review/{code}")
    public List<ReviewResponseDto> findAllPosts(@PathVariable String code, @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return reviewService.findReviewByMountainCode(code, pageable);
    }
    @PostMapping("/api/review")
    public Long save(@RequestBody ReviewRequestDto dto) {
        return reviewService.save(dto);
    }
}
