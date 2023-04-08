package com.manager.mountainview.application.dto.response;

import com.manager.mountainview.domain.posts.Posts;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class PostsListResponseDto {
    private Long id;
    private String title;
    private String writer;
    private LocalDateTime createdDate;

    public PostsListResponseDto(Posts entity) {
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.writer = entity.getUser().getName();
        this.createdDate = entity.getCreatedDate();
    }
}
