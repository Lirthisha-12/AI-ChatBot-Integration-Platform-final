package com.examly.springapp.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.dto.request.AnalyticsRequest;
import com.examly.springapp.dto.response.AnalyticsResponse;
import com.examly.springapp.service.AnalyticsService;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "*")
public class AnalyticsController {

    private final AnalyticsService service;

    public AnalyticsController(AnalyticsService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<AnalyticsResponse> createAnalytics(
            @RequestBody AnalyticsRequest request) {

        return ResponseEntity.ok(service.createAnalytics(request));
    }

    @GetMapping
    public ResponseEntity<List<AnalyticsResponse>> getAllAnalytics() {

        return ResponseEntity.ok(service.getAllAnalytics());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnalyticsResponse> getAnalyticsById(
            @PathVariable Long id) {

        return ResponseEntity.ok(service.getAnalyticsById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AnalyticsResponse> updateAnalytics(
            @PathVariable Long id,
            @RequestBody AnalyticsRequest request) {

        return ResponseEntity.ok(service.updateAnalytics(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAnalytics(
            @PathVariable Long id) {

        service.deleteAnalytics(id);

        return ResponseEntity.ok("Analytics Deleted Successfully");
    }
}