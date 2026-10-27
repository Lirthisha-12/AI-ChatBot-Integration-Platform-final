package com.examly.springapp.serviceimpl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.examly.springapp.dto.request.IntentRequest;
import com.examly.springapp.dto.response.IntentResponse;
import com.examly.springapp.model.Bot;
import com.examly.springapp.model.Intent;
import com.examly.springapp.repository.BotRepository;
import com.examly.springapp.repository.IntentRepository;
import com.examly.springapp.service.IntentService;

@Service
public class IntentServiceImpl implements IntentService {

    private final IntentRepository repository;
    private final BotRepository botRepository;

    public IntentServiceImpl(IntentRepository repository,
                             BotRepository botRepository) {
        this.repository = repository;
        this.botRepository = botRepository;
    }

    @Override
    public IntentResponse createIntent(IntentRequest request) {

        Bot bot = botRepository.findById(request.getBotId())
                .orElseThrow(() -> new RuntimeException("Bot not found"));

        Intent intent = new Intent();

        intent.setBot(bot);
        intent.setName(request.getName());
        intent.setDescription(request.getDescription());
        intent.setTrainingPhrases(request.getTrainingPhrases());
        intent.setResponses(request.getResponses());
        intent.setEntities(request.getEntities());
        intent.setConfidence(request.getConfidence());
        intent.setIsActive(request.getIsActive());
        intent.setCreatedDate(LocalDateTime.now());

        repository.save(intent);

        return mapToResponse(intent);
    }

    @Override
    public List<IntentResponse> getAllIntents() {
        return repository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public IntentResponse getIntentById(Long id) {

        Intent intent = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Intent not found"));

        return mapToResponse(intent);
    }

    @Override
    public IntentResponse updateIntent(Long id, IntentRequest request) {

        Intent intent = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Intent not found"));

        Bot bot = botRepository.findById(request.getBotId())
                .orElseThrow(() -> new RuntimeException("Bot not found"));

        intent.setBot(bot);
        intent.setName(request.getName());
        intent.setDescription(request.getDescription());
        intent.setTrainingPhrases(request.getTrainingPhrases());
        intent.setResponses(request.getResponses());
        intent.setEntities(request.getEntities());
        intent.setConfidence(request.getConfidence());
        intent.setIsActive(request.getIsActive());

        repository.save(intent);

        return mapToResponse(intent);
    }

    @Override
    public void deleteIntent(Long id) {

        Intent intent = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Intent not found"));

        repository.delete(intent);
    }

    private IntentResponse mapToResponse(Intent intent) {

        IntentResponse response = new IntentResponse();

        response.setId(intent.getId());
        response.setBotId(intent.getBot().getId());
        response.setBotName(intent.getBot().getName());
        response.setName(intent.getName());
        response.setDescription(intent.getDescription());
        response.setTrainingPhrases(intent.getTrainingPhrases());
        response.setResponses(intent.getResponses());
        response.setEntities(intent.getEntities());
        response.setConfidence(intent.getConfidence());
        response.setIsActive(intent.getIsActive());
        response.setCreatedDate(intent.getCreatedDate());

        return response;
    }
}