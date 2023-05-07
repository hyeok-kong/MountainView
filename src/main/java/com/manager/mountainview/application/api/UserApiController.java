package com.manager.mountainview.application.api;


import com.manager.mountainview.application.dto.request.UserRequestDto;
import com.manager.mountainview.application.service.UserService;
import com.manager.mountainview.domain.user.Role;
import com.manager.mountainview.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class UserApiController {

    private final UserService userService;

    @GetMapping("api/admin/addtestuser")
    public Long addTest() {
        User user = User.builder()
                .email("testemail@ggm.com")
                .name("테스트유저")
                .role(Role.USER)
                .build();

        UserRequestDto userRequestDto = UserRequestDto.builder()
                .user(user)
                .build();

        return userService.save(userRequestDto);
    }
}
