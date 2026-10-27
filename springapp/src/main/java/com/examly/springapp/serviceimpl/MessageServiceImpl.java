package com.examly.springapp.serviceimpl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.examly.springapp.dto.request.MessageRequest;
import com.examly.springapp.dto.response.MessageResponse;
import com.examly.springapp.model.Conversation;
import com.examly.springapp.model.Intent;
import com.examly.springapp.model.Message;
import com.examly.springapp.repository.ConversationRepository;
import com.examly.springapp.repository.IntentRepository;
import com.examly.springapp.repository.MessageRepository;
import com.examly.springapp.service.MessageService;

@Service
public class MessageServiceImpl implements MessageService {

    private final MessageRepository repository;
    private final ConversationRepository conversationRepository;
    private final IntentRepository intentRepository;

    public MessageServiceImpl(
            MessageRepository repository,
            ConversationRepository conversationRepository,
            IntentRepository intentRepository) {

        this.repository = repository;
        this.conversationRepository = conversationRepository;
        this.intentRepository = intentRepository;
    }

    @Override
    public MessageResponse createMessage(MessageRequest request) {

        // 1. Find conversation
        Conversation conversation = conversationRepository
                .findById(request.getConversationId())
                .orElseThrow(() ->
                        new RuntimeException("Conversation not found"));

        // 2. Save user's message
        Message message = new Message();

        message.setConversation(conversation);
        message.setSenderId(request.getSenderId());
        message.setSenderType(request.getSenderType());
        message.setContent(request.getContent());
        message.setMessageType(request.getMessageType());
        message.setTimestamp(LocalDateTime.now());
        message.setNlpResults(request.getNlpResults());
        message.setSentiment(request.getSentiment());
        message.setConfidence(request.getConfidence());

        repository.save(message);

        // 3. Find chatbot response
        String botReply = findBotResponse(
                conversation.getBot().getId(),
                request.getContent()
        );

        // 4. Put bot response into response
        MessageResponse response = mapToResponse(message);

        response.setContent(botReply);

        return response;
    }

private String findBotResponse(Long botId, String userMessage) {

    List<Intent> intents = intentRepository.findAll();

    String message = userMessage.toLowerCase().trim();

    for (Intent intent : intents) {

        if (intent.getIsActive() == null ||
                !intent.getIsActive()) {
            continue;
        }

        if (intent.getBot() == null ||
                !intent.getBot().getId().equals(botId)) {
            continue;
        }

        String trainingPhrases = intent.getTrainingPhrases();

        if (trainingPhrases == null ||
                trainingPhrases.trim().isEmpty()) {
            continue;
        }

        String[] phrases = trainingPhrases
                .toLowerCase()
                .split(",");

        for (String phrase : phrases) {

            phrase = phrase.trim();

            if (message.equals(phrase)) {

                return intent.getResponses();
            }
        }
    }

    return "Sorry, I don't understand your message.";
}
    @Override
    public List<MessageResponse> getAllMessages() {

        return repository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public MessageResponse getMessageById(Long id) {

        Message message = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Message not found"));

        return mapToResponse(message);
    }

    @Override
    public MessageResponse updateMessage(
            Long id,
            MessageRequest request) {

        Message message = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Message not found"));

        Conversation conversation =
                conversationRepository
                        .findById(request.getConversationId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Conversation not found"));

        message.setConversation(conversation);
        message.setSenderId(request.getSenderId());
        message.setSenderType(request.getSenderType());
        message.setContent(request.getContent());
        message.setMessageType(request.getMessageType());
        message.setNlpResults(request.getNlpResults());
        message.setSentiment(request.getSentiment());
        message.setConfidence(request.getConfidence());

        repository.save(message);

        return mapToResponse(message);
    }

    @Override
    public void deleteMessage(Long id) {
        repository.deleteById(id);
    }

    private MessageResponse mapToResponse(Message message) {

        MessageResponse response =
                new MessageResponse();

        response.setId(message.getId());

        response.setConversationId(
                message.getConversation().getId());

        response.setSessionId(
                message.getConversation().getSessionId());

        response.setSenderId(message.getSenderId());
        response.setSenderType(message.getSenderType());
        response.setContent(message.getContent());
        response.setMessageType(message.getMessageType());
        response.setTimestamp(message.getTimestamp());
        response.setNlpResults(message.getNlpResults());
        response.setSentiment(message.getSentiment());
        response.setConfidence(message.getConfidence());

        return response;
    }
}