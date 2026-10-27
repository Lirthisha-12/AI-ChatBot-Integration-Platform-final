package com.examly.springapp.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.dto.request.MessageRequest;
import com.examly.springapp.dto.response.MessageResponse;
import com.examly.springapp.service.MessageService;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "*")
public class MessageController {

    private final MessageService service;

    public MessageController(MessageService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<MessageResponse> createMessage(@RequestBody MessageRequest request) {
        return ResponseEntity.ok(service.createMessage(request));
    }

    @GetMapping
    public ResponseEntity<List<MessageResponse>> getAllMessages() {
        return ResponseEntity.ok(service.getAllMessages());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MessageResponse> getMessageById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getMessageById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MessageResponse> updateMessage(@PathVariable Long id,
                                                         @RequestBody MessageRequest request) {
        return ResponseEntity.ok(service.updateMessage(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMessage(@PathVariable Long id) {
        service.deleteMessage(id);
        return ResponseEntity.ok("Message Deleted Successfully");
    }
}