package com.examly.springapp.serviceimpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.examly.springapp.exception.ResourceNotFoundException;
import com.examly.springapp.model.ChatBot;
import com.examly.springapp.repository.ChatBotRepository;
import com.examly.springapp.service.ChatBotService;

@Service
public class ChatBotServiceImpl implements ChatBotService {

    private final ChatBotRepository repository;

    public ChatBotServiceImpl(ChatBotRepository repository) {
        this.repository = repository;
    }

    @Override
    public ChatBot saveChatBot(ChatBot chatBot) {
        return repository.save(chatBot);
    }

    @Override
    public List<ChatBot> getAllChatBots() {
        return repository.findAll();
    }

    @Override
    public ChatBot getChatBotById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ChatBot not found with id: " + id));
    }

    @Override
    public List<ChatBot> getIntegrationStatus(String platform) {
        return repository.findByPlatform(platform);
    }

    @Override
    public ChatBot updateChatBot(Long id, ChatBot chatBot) {

        ChatBot existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ChatBot not found with id: " + id));

        existing.setBotName(chatBot.getBotName());
        existing.setPlatform(chatBot.getPlatform());
        existing.setIntent(chatBot.getIntent());
        existing.setResponse(chatBot.getResponse());

        return repository.save(existing);
    }

    @Override
    public void deleteChatBot(Long id) {

        ChatBot existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ChatBot not found with id: " + id));

        repository.delete(existing);
    }
}