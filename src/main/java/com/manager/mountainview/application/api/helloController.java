package com.manager.mountainview.application.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class helloController {
    @GetMapping("/api/hello")
    public String hello() {
        return "hello world";
    }
}
