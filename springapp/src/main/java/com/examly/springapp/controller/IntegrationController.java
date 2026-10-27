package com.examly.springapp.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.dto.request.IntegrationRequest;
import com.examly.springapp.dto.response.IntegrationResponse;
import com.examly.springapp.service.IntegrationService;

@RestController
@RequestMapping("/api/integrations")
@CrossOrigin(origins = "*")
public class IntegrationController {

    private final IntegrationService service;

    public IntegrationController(IntegrationService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<IntegrationResponse> createIntegration(
            @RequestBody IntegrationRequest request) {

        return ResponseEntity.ok(service.createIntegration(request));
    }

    @GetMapping
    public ResponseEntity<List<IntegrationResponse>> getAllIntegrations() {

        return ResponseEntity.ok(service.getAllIntegrations());
    }

    @GetMapping("/{id}")
    public ResponseEntity<IntegrationResponse> getIntegrationById(
            @PathVariable Long id) {

        return ResponseEntity.ok(service.getIntegrationById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<IntegrationResponse> updateIntegration(
            @PathVariable Long id,
            @RequestBody IntegrationRequest request) {

        return ResponseEntity.ok(service.updateIntegration(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteIntegration(
            @PathVariable Long id) {

        service.deleteIntegration(id);

        return ResponseEntity.ok("Integration Deleted Successfully");
    }
}