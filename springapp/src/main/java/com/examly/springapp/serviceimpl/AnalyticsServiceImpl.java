package com.examly.springapp.serviceimpl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.examly.springapp.dto.request.AnalyticsRequest;
import com.examly.springapp.dto.response.AnalyticsResponse;
import com.examly.springapp.model.Analytics;
import com.examly.springapp.model.Bot;
import com.examly.springapp.model.Conversation;
import com.examly.springapp.repository.AnalyticsRepository;
import com.examly.springapp.repository.BotRepository;
import com.examly.springapp.repository.ConversationRepository;
import com.examly.springapp.service.AnalyticsService;

@Service
public class AnalyticsServiceImpl implements AnalyticsService {

    private final AnalyticsRepository repository;
    private final BotRepository botRepository;
    private final ConversationRepository conversationRepository;

    public AnalyticsServiceImpl(AnalyticsRepository repository,
                                BotRepository botRepository,
                                ConversationRepository conversationRepository) {
        this.repository = repository;
        this.botRepository = botRepository;
        this.conversationRepository = conversationRepository;
    }

    @Override
    public AnalyticsResponse createAnalytics(AnalyticsRequest request) {

        Bot bot = botRepository.findById(request.getBotId())
                .orElseThrow(() -> new RuntimeException("Bot not found"));

        Conversation conversation = conversationRepository.findById(request.getConversationId())
                .orElseThrow(() -> new RuntimeException("Conversation not found"));

        Analytics analytics = new Analytics();

        analytics.setBot(bot);
        analytics.setConversation(conversation);
        analytics.setMetricType(request.getMetricType());
        analytics.setValue(request.getValue());
        analytics.setDimensions(request.getDimensions());
        analytics.setCalculated(request.getCalculated());
        analytics.setPeriod(request.getPeriod());
        analytics.setTimestamp(LocalDateTime.now());

        repository.save(analytics);

        return mapToResponse(analytics);
    }

    @Override
    public List<AnalyticsResponse> getAllAnalytics() {

        return repository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public AnalyticsResponse getAnalyticsById(Long id) {

        Analytics analytics = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Analytics not found"));

        return mapToResponse(analytics);
    }

    @Override
    public AnalyticsResponse updateAnalytics(Long id,
                                             AnalyticsRequest request) {

        Analytics analytics = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Analytics not found"));

        Bot bot = botRepository.findById(request.getBotId())
                .orElseThrow(() -> new RuntimeException("Bot not found"));

        Conversation conversation = conversationRepository.findById(request.getConversationId())
                .orElseThrow(() -> new RuntimeException("Conversation not found"));

        analytics.setBot(bot);
        analytics.setConversation(conversation);
        analytics.setMetricType(request.getMetricType());
        analytics.setValue(request.getValue());
        analytics.setDimensions(request.getDimensions());
        analytics.setCalculated(request.getCalculated());
        analytics.setPeriod(request.getPeriod());

        repository.save(analytics);

        return mapToResponse(analytics);
    }

    @Override
    public void deleteAnalytics(Long id) {
        repository.deleteById(id);
    }

    private AnalyticsResponse mapToResponse(Analytics analytics) {

        AnalyticsResponse response = new AnalyticsResponse();

        response.setId(analytics.getId());

        response.setBotId(analytics.getBot().getId());
        response.setBotName(analytics.getBot().getName());

        response.setConversationId(analytics.getConversation().getId());
        response.setSessionId(analytics.getConversation().getSessionId());

        response.setMetricType(analytics.getMetricType());
        response.setValue(analytics.getValue());
        response.setTimestamp(analytics.getTimestamp());
        response.setDimensions(analytics.getDimensions());
        response.setCalculated(analytics.getCalculated());
        response.setPeriod(analytics.getPeriod());

        return response;
    }
}