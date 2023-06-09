package com.manager.mountainview.application.api;


import io.github.flashvayne.chatgpt.dto.chat.MultiChatMessage;
import io.github.flashvayne.chatgpt.service.ChatgptService;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;

@RequiredArgsConstructor
@RestController
public class ChatGPTController {

    private final ChatgptService chatgptService;

    @PostMapping("/api/chat")
    public String aiResponse(@RequestBody String request) {
        return chatgptService.multiChat(Arrays.asList(new MultiChatMessage("user", request)));
    }
}
