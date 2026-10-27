package com.examly.springapp.serviceimpl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.examly.springapp.dto.request.ConversationFlowRequest;
import com.examly.springapp.dto.response.ConversationFlowResponse;
import com.examly.springapp.model.Bot;
import com.examly.springapp.model.ConversationFlow;
import com.examly.springapp.repository.BotRepository;
import com.examly.springapp.repository.ConversationFlowRepository;
import com.examly.springapp.service.ConversationFlowService;

@Service
public class ConversationFlowServiceImpl implements ConversationFlowService {

    private final ConversationFlowRepository repository;
    private final BotRepository botRepository;

    public ConversationFlowServiceImpl(
            ConversationFlowRepository repository,
            BotRepository botRepository) {

        this.repository = repository;
        this.botRepository = botRepository;
    }

    @Override
    public ConversationFlowResponse createFlow(
            ConversationFlowRequest request) {

        Bot bot = botRepository.findById(request.getBotId())
                .orElseThrow(() -> new RuntimeException("Bot not found"));

        ConversationFlow flow = new ConversationFlow();

        flow.setBot(bot);
        flow.setFlowName(request.getFlowName());
        flow.setFlowData(request.getFlowData());
        flow.setVersion(request.getVersion());
        flow.setIsActive(request.getIsActive());
        flow.setCreatedBy(request.getCreatedBy());
        flow.setCreatedDate(LocalDateTime.now());
        flow.setLastModified(LocalDateTime.now());

        repository.save(flow);

        return mapToResponse(flow);
    }

    @Override
    public List<ConversationFlowResponse> getAllFlows() {

        return repository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ConversationFlowResponse getFlowById(Long id) {

        ConversationFlow flow = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Flow not found"));

        return mapToResponse(flow);
    }

    @Override
    public ConversationFlowResponse updateFlow(
            Long id,
            ConversationFlowRequest request) {

        ConversationFlow flow = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Flow not found"));

        Bot bot = botRepository.findById(request.getBotId())
                .orElseThrow(() -> new RuntimeException("Bot not found"));

        flow.setBot(bot);
        flow.setFlowName(request.getFlowName());
        flow.setFlowData(request.getFlowData());
        flow.setVersion(request.getVersion());
        flow.setIsActive(request.getIsActive());
        flow.setCreatedBy(request.getCreatedBy());
        flow.setLastModified(LocalDateTime.now());

        repository.save(flow);

        return mapToResponse(flow);
    }

    @Override
    public void deleteFlow(Long id) {

        repository.deleteById(id);
    }

    private ConversationFlowResponse mapToResponse(
            ConversationFlow flow) {

        ConversationFlowResponse response = new ConversationFlowResponse();

        response.setId(flow.getId());
        response.setBotId(flow.getBot().getId());
        response.setBotName(flow.getBot().getName());
        response.setFlowName(flow.getFlowName());
        response.setFlowData(flow.getFlowData());
        response.setVersion(flow.getVersion());
        response.setIsActive(flow.getIsActive());
        response.setCreatedBy(flow.getCreatedBy());
        response.setCreatedDate(flow.getCreatedDate());
        response.setLastModified(flow.getLastModified());

        return response;
    }
}