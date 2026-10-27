package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.model.ChatBot;

public interface ChatBotService {

    ChatBot saveChatBot(ChatBot chatBot);

    List<ChatBot> getAllChatBots();
    ChatBot getChatBotById(Long id);
    List<ChatBot> getIntegrationStatus(String platform);
    ChatBot updateChatBot(Long id, ChatBot chatBot);
    void deleteChatBot(Long id);

}