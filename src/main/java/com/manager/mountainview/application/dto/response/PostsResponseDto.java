package com.manager.mountainview.application.dto.response;

import com.manager.mountainview.domain.posts.Posts;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class PostsResponseDto {
    private Long id;
    private String title;
    private String content;
    private String writer;
    private LocalDateTime createdDate;

    public PostsResponseDto(Posts entity) {
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.content = entity.getContent();
        this.writer = entity.getUser().getName();
        this.createdDate = entity.getCreatedDate();
    }
}
