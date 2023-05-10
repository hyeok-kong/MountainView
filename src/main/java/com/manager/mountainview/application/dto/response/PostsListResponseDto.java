package com.manager.mountainview.application.dto.response;

import com.manager.mountainview.application.service.Formatter;
import com.manager.mountainview.domain.posts.Posts;
import lombok.Getter;


@Getter
public class PostsListResponseDto {
    private Long id;
    private String title;
    private String content;
    private String writer;
    private String time;

    public PostsListResponseDto(Posts entity) {
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.content = entity.getContent();
        this.writer = entity.getUser().getName();
        this.time = Formatter.localDateTimeToString(entity.getCreatedDate());
    }
}
