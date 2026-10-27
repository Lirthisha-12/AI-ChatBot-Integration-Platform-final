package com.examly.springapp.serviceimpl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.examly.springapp.dto.request.IntegrationRequest;
import com.examly.springapp.dto.response.IntegrationResponse;
import com.examly.springapp.model.Bot;
import com.examly.springapp.model.Integration;
import com.examly.springapp.repository.BotRepository;
import com.examly.springapp.repository.IntegrationRepository;
import com.examly.springapp.service.IntegrationService;

@Service
public class IntegrationServiceImpl implements IntegrationService {

    private final IntegrationRepository repository;
    private final BotRepository botRepository;

    public IntegrationServiceImpl(IntegrationRepository repository,
                                  BotRepository botRepository) {

        this.repository = repository;
        this.botRepository = botRepository;
    }

    @Override
    public IntegrationResponse createIntegration(IntegrationRequest request) {

        Bot bot = botRepository.findById(request.getBotId())
                .orElseThrow(() -> new RuntimeException("Bot not found"));

        Integration integration = new Integration();

        integration.setBot(bot);
        integration.setIntegrationType(request.getIntegrationType());
        integration.setConfiguration(request.getConfiguration());
        integration.setCredentials(request.getCredentials());
        integration.setStatus(request.getStatus());
        integration.setErrorLog(request.getErrorLog());
        integration.setCreatedDate(LocalDateTime.now());
        integration.setLastSync(LocalDateTime.now());

        repository.save(integration);

        return mapToResponse(integration);
    }

    @Override
    public List<IntegrationResponse> getAllIntegrations() {

        return repository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public IntegrationResponse getIntegrationById(Long id) {

        Integration integration = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Integration not found"));

        return mapToResponse(integration);
    }

    @Override
    public IntegrationResponse updateIntegration(Long id,
                                                 IntegrationRequest request) {

        Integration integration = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Integration not found"));

        Bot bot = botRepository.findById(request.getBotId())
                .orElseThrow(() -> new RuntimeException("Bot not found"));

        integration.setBot(bot);
        integration.setIntegrationType(request.getIntegrationType());
        integration.setConfiguration(request.getConfiguration());
        integration.setCredentials(request.getCredentials());
        integration.setStatus(request.getStatus());
        integration.setErrorLog(request.getErrorLog());
        integration.setLastSync(LocalDateTime.now());

        repository.save(integration);

        return mapToResponse(integration);
    }

    @Override
    public void deleteIntegration(Long id) {

        repository.deleteById(id);
    }

    private IntegrationResponse mapToResponse(Integration integration) {

        IntegrationResponse response = new IntegrationResponse();

        response.setId(integration.getId());
        response.setBotId(integration.getBot().getId());
        response.setBotName(integration.getBot().getName());
        response.setIntegrationType(integration.getIntegrationType());
        response.setConfiguration(integration.getConfiguration());
        response.setCredentials(integration.getCredentials());
        response.setStatus(integration.getStatus());
        response.setLastSync(integration.getLastSync());
        response.setErrorLog(integration.getErrorLog());
        response.setCreatedDate(integration.getCreatedDate());

        return response;
    }
}