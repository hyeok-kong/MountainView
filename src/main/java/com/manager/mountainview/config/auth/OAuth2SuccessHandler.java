package com.manager.mountainview.config.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.manager.mountainview.application.dto.user.UserDto;
import com.manager.mountainview.application.service.UserService;
import com.manager.mountainview.config.auth.dto.TokenUserDto;
import com.manager.mountainview.config.auth.token.Token;
import com.manager.mountainview.config.auth.token.TokenService;
import com.manager.mountainview.domain.user.Role;
import com.manager.mountainview.domain.user.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {
    private final TokenService tokenService;
    private final UserRequestMapper userRequestMapper;
    private final ObjectMapper objectMapper;
    private final UserService userService;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
        throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        TokenUserDto tokenUserDto = userRequestMapper.toDto(oAuth2User);

        try {
            userService.findByEmail(tokenUserDto.getEmail());
        } catch (IllegalArgumentException e) {
            User user = User.builder()
                    .email(tokenUserDto.getEmail())
                    .name(tokenUserDto.getName())
                    .role(Role.USER)
                    .build();

            userService.save(new UserDto(user));
        } catch (Exception e) {
            System.out.println("예상하지 못한 예외 발생");
        }

        Token token = tokenService.generateToken(tokenUserDto.getEmail(), "USER");

        writeTokenResponse(response, token);
    }

    private void writeTokenResponse(HttpServletResponse response, Token token) throws IOException {
        response.setContentType("text/html;charset=UTF-8");

        response.addHeader("Auth", token.getToken());
        response.addHeader("Refresh", token.getRefreshToken());
        response.setContentType("application/json;charset=UTF-8");

        // 테스트 시 token 화면에 표시
        var writer = response.getWriter();
        writer.println(objectMapper.writeValueAsString(token));
        writer.flush();
    }
}
