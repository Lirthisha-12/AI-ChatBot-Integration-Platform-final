package com.examly.springapp.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.dto.request.BotRequest;
import com.examly.springapp.dto.response.BotResponse;
import com.examly.springapp.service.BotService;

@RestController
@RequestMapping("/api/bots")
@CrossOrigin(origins = "*")
public class BotController {

    private final BotService service;

    public BotController(BotService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<BotResponse> createBot(@RequestBody BotRequest request) {
        return ResponseEntity.ok(service.createBot(request));
    }

    @GetMapping
    public ResponseEntity<List<BotResponse>> getAllBots() {
        return ResponseEntity.ok(service.getAllBots());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BotResponse> getBotById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getBotById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BotResponse> updateBot(@PathVariable Long id,
                                                 @RequestBody BotRequest request) {
        return ResponseEntity.ok(service.updateBot(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBot(@PathVariable Long id) {
        service.deleteBot(id);
        return ResponseEntity.ok("Bot Deleted Successfully");
    }
}