package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.dto.request.BotRequest;
import com.examly.springapp.dto.response.BotResponse;

public interface BotService {

    BotResponse createBot(BotRequest request);

    List<BotResponse> getAllBots();

    BotResponse getBotById(Long id);

    BotResponse updateBot(Long id, BotRequest request);

    void deleteBot(Long id);
}