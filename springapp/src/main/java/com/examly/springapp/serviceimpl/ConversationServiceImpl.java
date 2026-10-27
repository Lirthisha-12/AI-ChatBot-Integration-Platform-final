package com.examly.springapp.serviceimpl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.examly.springapp.dto.request.ConversationRequest;
import com.examly.springapp.dto.response.ConversationResponse;
import com.examly.springapp.model.Bot;
import com.examly.springapp.model.Conversation;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.BotRepository;
import com.examly.springapp.repository.ConversationRepository;
import com.examly.springapp.repository.UserRepository;
import com.examly.springapp.service.ConversationService;

@Service
public class ConversationServiceImpl implements ConversationService {

    private final ConversationRepository repository;
    private final BotRepository botRepository;
    private final UserRepository userRepository;

    public ConversationServiceImpl(ConversationRepository repository,
                                   BotRepository botRepository,
                                   UserRepository userRepository) {

        this.repository = repository;
        this.botRepository = botRepository;
        this.userRepository = userRepository;
    }

    @Override
    public ConversationResponse createConversation(
            ConversationRequest request) {

        Bot bot = botRepository.findById(request.getBotId())
                .orElseThrow(() -> new RuntimeException("Bot not found"));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Conversation conversation = new Conversation();

        conversation.setBot(bot);
        conversation.setUser(user);
        conversation.setChannelId(request.getChannelId());
        conversation.setSessionId(request.getSessionId());
        conversation.setStatus(request.getStatus());
        conversation.setSatisfaction(request.getSatisfaction());
        conversation.setAgentInvolved(request.getAgentInvolved());
        conversation.setMetadata(request.getMetadata());
        conversation.setStartTime(LocalDateTime.now());

        repository.save(conversation);

        return mapToResponse(conversation);
    }

    @Override
    public List<ConversationResponse> getAllConversations() {

        return repository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ConversationResponse getConversationById(Long id) {

        Conversation conversation = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Conversation not found"));

        return mapToResponse(conversation);
    }

    @Override
    public ConversationResponse updateConversation(Long id,
                                                   ConversationRequest request) {

        Conversation conversation = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Conversation not found"));

        Bot bot = botRepository.findById(request.getBotId())
                .orElseThrow(() -> new RuntimeException("Bot not found"));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        conversation.setBot(bot);
        conversation.setUser(user);
        conversation.setChannelId(request.getChannelId());
        conversation.setSessionId(request.getSessionId());
        conversation.setStatus(request.getStatus());
        conversation.setSatisfaction(request.getSatisfaction());
        conversation.setAgentInvolved(request.getAgentInvolved());
        conversation.setMetadata(request.getMetadata());
        conversation.setEndTime(LocalDateTime.now());

        repository.save(conversation);

        return mapToResponse(conversation);
    }

    @Override
    public void deleteConversation(Long id) {

        repository.deleteById(id);
    }

    private ConversationResponse mapToResponse(
            Conversation conversation) {

        ConversationResponse response = new ConversationResponse();

        response.setId(conversation.getId());

        response.setBotId(conversation.getBot().getId());
        response.setBotName(conversation.getBot().getName());

        response.setUserId(conversation.getUser().getId());
        response.setUsername(conversation.getUser().getUsername());

        response.setChannelId(conversation.getChannelId());
        response.setSessionId(conversation.getSessionId());

        response.setStartTime(conversation.getStartTime());
        response.setEndTime(conversation.getEndTime());

        response.setStatus(conversation.getStatus());
        response.setSatisfaction(conversation.getSatisfaction());
        response.setAgentInvolved(conversation.getAgentInvolved());
        response.setMetadata(conversation.getMetadata());

        return response;
    }
}