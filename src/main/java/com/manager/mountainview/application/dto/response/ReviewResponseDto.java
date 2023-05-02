package com.manager.mountainview.application.dto.response;

import com.manager.mountainview.application.service.Formatter;
import com.manager.mountainview.domain.review.Review;
import lombok.Builder;
import lombok.Getter;

@Getter
public class ReviewResponseDto {
    private int score;
    private String content;
    private String username;
    private String time;

    @Builder
    public ReviewResponseDto(Review entity) {
        this.score = entity.getScore();
        this.content = entity.getContent();
        this.username = entity.getUser().getName();
        this.time = Formatter.localDateTimeToString(entity.getCreatedDate());
    }
}
