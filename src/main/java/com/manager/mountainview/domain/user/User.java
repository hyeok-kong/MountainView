package com.manager.mountainview.domain.user;


import com.manager.mountainview.domain.BaseTimeEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class User extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 200, nullable = false)
    private String name;

    @Column(length = 200, nullable = false)
    private String email;

    @Column(nullable = false)
    private Role role;

    @Column(length = 200)
    private String nickname;

    @Column
    private char gender;

    @Column(length = 200)
    private int age;

    @ColumnDefault("false")
    @Column(nullable = false)
    private boolean isSubmitted;

    @Builder
    public User(String name, String email, Role role, String nickname, char gender, int age, boolean isSubmitted) {
        this.name = name;
        this.email = email;
        this.role = role;
        this.nickname = nickname;
        this.gender = gender;
        this.age = age;
        this.isSubmitted = isSubmitted;
    }

    public User update(String name) {
        this.name = name;

        return this;
    }
}
