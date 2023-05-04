package com.manager.mountainview.domain.comment;


import com.manager.mountainview.domain.BaseTimeEntity;
import com.manager.mountainview.domain.posts.Posts;
import com.manager.mountainview.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Comment extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "posts_id")
    private Posts posts;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Builder
    public Comment(String content, User user, Posts posts) {
        this.content = content;
        this.posts = posts;
        this.user = user;
    }

    public void update(String content) {
        this.content = content;
    }
}
