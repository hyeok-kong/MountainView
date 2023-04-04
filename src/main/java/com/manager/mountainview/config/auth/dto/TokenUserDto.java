package com.manager.mountainview.config.auth.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class TokenUserDto {
    private String email;
    private String name;

    @Builder
    public TokenUserDto(String email, String name) {
        this.email = email;
        this.name = name;
    }
}
