package com.manager.mountainview.domain.review;

import com.manager.mountainview.domain.BaseTimeEntity;
import com.manager.mountainview.domain.mountain.Mountain;
import com.manager.mountainview.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Review extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int score;

    private String content;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "mountain_id")
    private Mountain mountain;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Builder
    public Review(int score, String content, Mountain mountain, User user) {
        this.score = score;
        this.content = content;
        this.mountain = mountain;
        this.user = user;
    }

    public void update(int score, String content) {
        this.score = score;
        this.content = content;
    }
}
