package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.model.ChatBot;
import com.examly.springapp.service.ChatBotService;

@RestController
@RequestMapping("/api/chatbots")
@CrossOrigin(origins = "http://localhost:3000")
public class ChatBotController {

    @Autowired
    private ChatBotService service;

    @PostMapping
    public ChatBot saveChatBot(@RequestBody ChatBot chatBot) {
        return service.saveChatBot(chatBot);
    }

    @GetMapping
    public List<ChatBot> getAllChatBots() {
        return service.getAllChatBots();
    }

    @GetMapping("/integration")
    public List<ChatBot> getIntegrationStatus(
            @RequestParam String platform) {

        return service.getIntegrationStatus(platform);
    }

    @DeleteMapping("/{id}")
    public void deleteChatBot(@PathVariable Long id) {
        service.deleteChatBot(id);
    }
}