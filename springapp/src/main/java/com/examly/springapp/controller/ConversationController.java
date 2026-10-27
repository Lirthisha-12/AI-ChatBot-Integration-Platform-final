package com.examly.springapp.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.dto.request.ConversationRequest;
import com.examly.springapp.dto.response.ConversationResponse;
import com.examly.springapp.service.ConversationService;

@RestController
@RequestMapping("/api/conversations")
@CrossOrigin(origins = "*")
public class ConversationController {

    private final ConversationService service;

    public ConversationController(ConversationService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<ConversationResponse> createConversation(
            @RequestBody ConversationRequest request) {

        return ResponseEntity.ok(service.createConversation(request));
    }

    @GetMapping
    public ResponseEntity<List<ConversationResponse>> getAllConversations() {

        return ResponseEntity.ok(service.getAllConversations());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ConversationResponse> getConversationById(
            @PathVariable Long id) {

        return ResponseEntity.ok(service.getConversationById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ConversationResponse> updateConversation(
            @PathVariable Long id,
            @RequestBody ConversationRequest request) {

        return ResponseEntity.ok(service.updateConversation(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteConversation(
            @PathVariable Long id) {

        service.deleteConversation(id);

        return ResponseEntity.ok("Conversation Deleted Successfully");
    }
}