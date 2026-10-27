package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.dto.request.AnalyticsRequest;
import com.examly.springapp.dto.response.AnalyticsResponse;

public interface AnalyticsService {

    AnalyticsResponse createAnalytics(AnalyticsRequest request);

    List<AnalyticsResponse> getAllAnalytics();

    AnalyticsResponse getAnalyticsById(Long id);

    AnalyticsResponse updateAnalytics(Long id, AnalyticsRequest request);

    void deleteAnalytics(Long id);

}