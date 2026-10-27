package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.dto.request.IntentRequest;
import com.examly.springapp.dto.response.IntentResponse;

public interface IntentService {

    IntentResponse createIntent(IntentRequest request);

    List<IntentResponse> getAllIntents();

    IntentResponse getIntentById(Long id);

    IntentResponse updateIntent(Long id, IntentRequest request);

    void deleteIntent(Long id);

}