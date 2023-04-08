package com.manager.mountainview.application.dto.request;

import com.manager.mountainview.domain.posts.Posts;
import lombok.Builder;
import lombok.Getter;

@Getter
public class PostsRequestDto {
    private String title;
    private String content;
    private Long userid;

    @Builder
    public PostsRequestDto(String title, String content, Long userid) {
        this.title = title;
        this.content = content;
        this.userid = userid;
    }

    public Posts toEntity() {
        return Posts.builder()
                .title(title)
                .content(content)
                .build();
    }


}
