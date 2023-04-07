package com.manager.mountainview.application.service;

import com.manager.mountainview.application.dto.request.UserRequestDto;
import com.manager.mountainview.domain.user.User;
import com.manager.mountainview.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

    @Transactional
    public Long save(UserRequestDto userRequestDto) {
        return userRepository.save(userRequestDto.toEntity()).getId();
    }
    public UserRequestDto findByEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() ->
                new IllegalArgumentException("해당 유저가 없습니다. email : " + email));

        return new UserRequestDto(user);
    }


}
