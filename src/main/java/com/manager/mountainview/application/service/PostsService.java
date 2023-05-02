package com.manager.mountainview.application.service;

import com.manager.mountainview.application.dto.request.PostsRequestDto;
import com.manager.mountainview.application.dto.response.PostsListResponseDto;
import com.manager.mountainview.application.dto.response.PostsResponseDto;
import com.manager.mountainview.domain.posts.Posts;
import com.manager.mountainview.domain.posts.PostsRepository;
import com.manager.mountainview.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PostsService {
    private final PostsRepository postsRepository;
    private final UserService userService;



    @Transactional
    public Long save(PostsRequestDto requestDto) {
        User user = userService.findById(requestDto.getUserid());

        Posts posts = Posts.builder()
                .title(requestDto.getTitle())
                .content(requestDto.getContent())
                .build();

        posts.setUser(user);

        return postsRepository.save(posts).getId();
    }

    @Transactional
    public Long update(Long id, PostsRequestDto dto) {
        Posts posts = postsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id : " + id));

        // 요청자와 작성자가 같을때만
        if(posts.getUser().getId() == dto.getUserid()) {
            posts.update(dto.getTitle(), dto.getContent());
        }

        return id;
    }

    @Transactional
    public Long delete(Long id) {
        Posts posts = postsRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException("해당 게시글이 없습니다. id : " + id));

        postsRepository.delete(posts);

        return id;
    }


    @Transactional
    public List<PostsListResponseDto> findAllDesc(Pageable pageable) {
        return postsRepository.findAllDesc(pageable).stream()
                .map(PostsListResponseDto::new)
                .collect(Collectors.toList());
    }

    // 게시글 내용 반환
    @Transactional
    public PostsResponseDto findById(Long id) {
        Posts posts = postsRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException("해당 게시글이 없습니다. id=" + id));

        return new PostsResponseDto(posts);
    }

    // 특정 사용자가 작성한 게시글 모두
    @Transactional
    public List<PostsListResponseDto> findByUserId(Long id, Pageable pageable) {
        return postsRepository.getPostsByUserId(id, pageable).stream()
                .map(PostsListResponseDto::new)
                .collect(Collectors.toList());
    }

}
