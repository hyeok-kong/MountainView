package com.manager.mountainview.application.dto.request;

import com.manager.mountainview.domain.user.Role;
import com.manager.mountainview.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserRequestDto {
    private String email;
    private String name;
    private String nickname;
    private Role role;
    private char gender;
    private int age;
    private boolean isSubmitted;

    @Builder
    public UserRequestDto(User user) {
        this.email = user.getEmail();
        this.name = user.getName();
        this.nickname = user.getNickname();
        this.role = user.getRole();
        this.gender = user.getGender();
        this.age = user.getAge();
        this.isSubmitted = user.isSubmitted();
    }

    public User toEntity() {
        return User.builder()
                .email(email)
                .name(name)
                .nickname(nickname)
                .role(role)
                .gender(gender)
                .age(age)
                .isSubmitted(isSubmitted)
                .build();
    }
}
