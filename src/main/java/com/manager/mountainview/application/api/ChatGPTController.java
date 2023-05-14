package com.manager.mountainview.application.api;


import io.github.flashvayne.chatgpt.dto.chat.MultiChatMessage;
import io.github.flashvayne.chatgpt.service.ChatgptService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;

@RequiredArgsConstructor
@RestController
public class ChatGPTController {

    private final ChatgptService chatgptService;

    @GetMapping("/api/chat")
    public String aiResponse(@RequestBody String request) {
        return chatgptService.multiChat(Arrays.asList(new MultiChatMessage("user", request)));
    }
}
