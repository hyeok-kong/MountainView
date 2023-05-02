package com.manager.mountainview.application.dto.request;

import lombok.Getter;

@Getter
public class ReviewRequestDto {
    private int score;
    private String content;
    private Long userid;
    private String code;

    public ReviewRequestDto(int score, String content, Long userid, String code) {
        this.score = score;
        this.content = content;
        this.userid = userid;
        this.code = code;
    }
}
