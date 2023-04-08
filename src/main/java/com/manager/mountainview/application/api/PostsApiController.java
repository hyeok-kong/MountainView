package com.manager.mountainview.application.api;

import com.manager.mountainview.application.dto.request.PostsRequestDto;
import com.manager.mountainview.application.dto.response.PostsListResponseDto;
import com.manager.mountainview.application.dto.response.PostsResponseDto;
import com.manager.mountainview.application.service.PostsService;
import com.manager.mountainview.application.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class PostsApiController {
    private final PostsService postsService;
    private final UserService userService;

    // 게시글 저장
    @PostMapping("/api/posts")
    public Long save(@RequestBody PostsRequestDto requestDto) {
        return postsService.save(requestDto);
    }

    // 모든 게시물 보기
    @GetMapping("/api/posts")
    public List<PostsListResponseDto> findAllPosts(@PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return postsService.findAllDesc(pageable);
    }

    @GetMapping("/api/posts/{id}")
    public PostsResponseDto findPostsById(@PathVariable Long id) {
        return postsService.findById(id);
    }

    // 특정 유저가 작성한 모든 게시글 보기
    @GetMapping("/api/user/posts/{id}")
    public List<PostsListResponseDto> findPostsByUserId
            (@PathVariable Long id, @PageableDefault(sort = "id", direction = Sort.Direction.DESC)Pageable pageable) {
        return postsService.findByUserId(id, pageable);
    }
}
