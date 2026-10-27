package com.examly.springapp.serviceimpl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.examly.springapp.dto.request.ChannelRequest;
import com.examly.springapp.dto.response.ChannelResponse;
import com.examly.springapp.model.Bot;
import com.examly.springapp.model.Channel;
import com.examly.springapp.repository.BotRepository;
import com.examly.springapp.repository.ChannelRepository;
import com.examly.springapp.service.ChannelService;

@Service
public class ChannelServiceImpl implements ChannelService {

    private final ChannelRepository repository;
    private final BotRepository botRepository;

    public ChannelServiceImpl(ChannelRepository repository,
                              BotRepository botRepository) {

        this.repository = repository;
        this.botRepository = botRepository;
    }

    @Override
    public ChannelResponse createChannel(ChannelRequest request) {

        Bot bot = botRepository.findById(request.getBotId())
                .orElseThrow(() -> new RuntimeException("Bot not found"));

        Channel channel = new Channel();

        channel.setBot(bot);
        channel.setChannelType(request.getChannelType());
        channel.setConfiguration(request.getConfiguration());
        channel.setDeploymentStatus(request.getDeploymentStatus());
        channel.setCustomization(request.getCustomization());
        channel.setMetrics(request.getMetrics());
        channel.setLastDeployment(LocalDateTime.now());

        repository.save(channel);

        return mapToResponse(channel);
    }

    @Override
    public List<ChannelResponse> getAllChannels() {

        return repository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ChannelResponse getChannelById(Long id) {

        Channel channel = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Channel not found"));

        return mapToResponse(channel);
    }

    @Override
    public ChannelResponse updateChannel(Long id,
                                         ChannelRequest request) {

        Channel channel = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Channel not found"));

        Bot bot = botRepository.findById(request.getBotId())
                .orElseThrow(() -> new RuntimeException("Bot not found"));

        channel.setBot(bot);
        channel.setChannelType(request.getChannelType());
        channel.setConfiguration(request.getConfiguration());
        channel.setDeploymentStatus(request.getDeploymentStatus());
        channel.setCustomization(request.getCustomization());
        channel.setMetrics(request.getMetrics());
        channel.setLastDeployment(LocalDateTime.now());

        repository.save(channel);

        return mapToResponse(channel);
    }

    @Override
    public void deleteChannel(Long id) {

        repository.deleteById(id);
    }

    private ChannelResponse mapToResponse(Channel channel) {

        ChannelResponse response = new ChannelResponse();

        response.setId(channel.getId());
        response.setBotId(channel.getBot().getId());
        response.setBotName(channel.getBot().getName());
        response.setChannelType(channel.getChannelType());
        response.setConfiguration(channel.getConfiguration());
        response.setDeploymentStatus(channel.getDeploymentStatus());
        response.setCustomization(channel.getCustomization());
        response.setMetrics(channel.getMetrics());
        response.setLastDeployment(channel.getLastDeployment());

        return response;
    }
}