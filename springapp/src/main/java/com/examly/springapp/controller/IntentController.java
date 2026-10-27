package com.examly.springapp.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.dto.request.IntentRequest;
import com.examly.springapp.dto.response.IntentResponse;
import com.examly.springapp.service.IntentService;

@RestController
@RequestMapping("/api/intents")
@CrossOrigin(origins = "*")
public class IntentController {

    private final IntentService service;

    public IntentController(IntentService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<IntentResponse> createIntent(
            @RequestBody IntentRequest request) {

        return ResponseEntity.ok(service.createIntent(request));
    }

    @GetMapping
    public ResponseEntity<List<IntentResponse>> getAllIntents() {

        return ResponseEntity.ok(service.getAllIntents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<IntentResponse> getIntentById(
            @PathVariable Long id) {

        return ResponseEntity.ok(service.getIntentById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<IntentResponse> updateIntent(
            @PathVariable Long id,
            @RequestBody IntentRequest request) {

        return ResponseEntity.ok(service.updateIntent(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteIntent(
            @PathVariable Long id) {

        service.deleteIntent(id);

        return ResponseEntity.ok("Intent Deleted Successfully");
    }
}