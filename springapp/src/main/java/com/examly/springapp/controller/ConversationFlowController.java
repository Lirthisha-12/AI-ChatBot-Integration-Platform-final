package com.examly.springapp.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.dto.request.ConversationFlowRequest;
import com.examly.springapp.dto.response.ConversationFlowResponse;
import com.examly.springapp.service.ConversationFlowService;

@RestController
@RequestMapping("/api/flows")
@CrossOrigin(origins = "*")
public class ConversationFlowController {

    private final ConversationFlowService service;

    public ConversationFlowController(ConversationFlowService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<ConversationFlowResponse> createFlow(
            @RequestBody ConversationFlowRequest request) {

        return ResponseEntity.ok(service.createFlow(request));
    }

    @GetMapping
    public ResponseEntity<List<ConversationFlowResponse>> getAllFlows() {

        return ResponseEntity.ok(service.getAllFlows());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ConversationFlowResponse> getFlowById(
            @PathVariable Long id) {

        return ResponseEntity.ok(service.getFlowById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ConversationFlowResponse> updateFlow(
            @PathVariable Long id,
            @RequestBody ConversationFlowRequest request) {

        return ResponseEntity.ok(service.updateFlow(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFlow(
            @PathVariable Long id) {

        service.deleteFlow(id);

        return ResponseEntity.ok("Conversation Flow Deleted Successfully");
    }
}