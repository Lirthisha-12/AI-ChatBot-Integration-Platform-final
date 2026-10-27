package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.dto.request.IntegrationRequest;
import com.examly.springapp.dto.response.IntegrationResponse;

public interface IntegrationService {

    IntegrationResponse createIntegration(IntegrationRequest request);

    List<IntegrationResponse> getAllIntegrations();

    IntegrationResponse getIntegrationById(Long id);

    IntegrationResponse updateIntegration(Long id, IntegrationRequest request);

    void deleteIntegration(Long id);

}