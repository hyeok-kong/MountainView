package com.manager.mountainview.config.auth;

import com.manager.mountainview.application.service.UserService;
import com.manager.mountainview.config.auth.token.TokenService;
import com.manager.mountainview.config.filter.JwtAuthFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@RequiredArgsConstructor
@EnableWebSecurity
@Configuration
public class SecurityConfig {
    private final CustomOAuth2UserService oAuth2UserService;
    private final OAuth2SuccessHandler successHandler;
    private final TokenService tokenService;
    private final UserService userService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.httpBasic().disable()
                    .csrf().disable()
                    .headers().frameOptions().disable()
                .and()
                // JWT 사용을 위한 STATELESS
                    .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                    .authorizeRequests()
                        .antMatchers("/h2-console/**").permitAll()
                        .antMatchers("/token/**").permitAll()
                        .anyRequest().permitAll()
                .and()
                    .oauth2Login().loginPage("/token/expired")
                        .successHandler(successHandler)
                        .userInfoEndpoint().userService(oAuth2UserService);

        http.addFilterBefore(new JwtAuthFilter(tokenService, userService), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

}
