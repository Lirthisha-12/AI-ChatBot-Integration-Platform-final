package com.examly.springapp.serviceimpl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.examly.springapp.dto.request.BotRequest;
import com.examly.springapp.dto.response.BotResponse;
import com.examly.springapp.model.Bot;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.BotRepository;
import com.examly.springapp.repository.UserRepository;
import com.examly.springapp.service.BotService;

@Service
public class BotServiceImpl implements BotService {

    private final BotRepository repository;
    private final UserRepository userRepository;

    public BotServiceImpl(BotRepository repository,
                          UserRepository userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    @Override
    public BotResponse createBot(BotRequest request) {

        User owner = userRepository.findById(request.getOwnerId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Bot bot = new Bot();

        bot.setOwner(owner);
        bot.setName(request.getName());
        bot.setDescription(request.getDescription());
        bot.setConfiguration(request.getConfiguration());
        bot.setNlpModel(request.getNlpModel());
        bot.setDeploymentChannels(request.getDeploymentChannels());
        bot.setStatus(request.getStatus());
        bot.setVersion(request.getVersion());

        repository.save(bot);

        return mapToResponse(bot);
    }

    @Override
    public List<BotResponse> getAllBots() {

        return repository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public BotResponse getBotById(Long id) {

        Bot bot = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bot not found"));

        return mapToResponse(bot);
    }

    @Override
    public BotResponse updateBot(Long id, BotRequest request) {

        Bot bot = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bot not found"));

        User owner = userRepository.findById(request.getOwnerId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        bot.setOwner(owner);
        bot.setName(request.getName());
        bot.setDescription(request.getDescription());
        bot.setConfiguration(request.getConfiguration());
        bot.setNlpModel(request.getNlpModel());
        bot.setDeploymentChannels(request.getDeploymentChannels());
        bot.setStatus(request.getStatus());
        bot.setVersion(request.getVersion());

        repository.save(bot);

        return mapToResponse(bot);
    }

    @Override
    public void deleteBot(Long id) {

        Bot bot = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bot not found"));

        repository.delete(bot);
    }

    private BotResponse mapToResponse(Bot bot) {

        BotResponse response = new BotResponse();

        response.setId(bot.getId());

        if (bot.getOwner() != null) {
            response.setOwnerId(bot.getOwner().getId());
            response.setOwnerName(bot.getOwner().getUsername());
        }

        response.setName(bot.getName());
        response.setDescription(bot.getDescription());
        response.setConfiguration(bot.getConfiguration());
        response.setNlpModel(bot.getNlpModel());
        response.setDeploymentChannels(bot.getDeploymentChannels());
        response.setStatus(bot.getStatus());
        response.setVersion(bot.getVersion());

        return response;
    }
}