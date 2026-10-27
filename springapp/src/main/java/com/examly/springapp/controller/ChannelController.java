package com.examly.springapp.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.dto.request.ChannelRequest;
import com.examly.springapp.dto.response.ChannelResponse;
import com.examly.springapp.service.ChannelService;

@RestController
@RequestMapping("/api/channels")
@CrossOrigin(origins = "*")
public class ChannelController {

    private final ChannelService service;

    public ChannelController(ChannelService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<ChannelResponse> createChannel(
            @RequestBody ChannelRequest request) {

        return ResponseEntity.ok(service.createChannel(request));
    }

    @GetMapping
    public ResponseEntity<List<ChannelResponse>> getAllChannels() {

        return ResponseEntity.ok(service.getAllChannels());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ChannelResponse> getChannelById(
            @PathVariable Long id) {

        return ResponseEntity.ok(service.getChannelById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ChannelResponse> updateChannel(
            @PathVariable Long id,
            @RequestBody ChannelRequest request) {

        return ResponseEntity.ok(service.updateChannel(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteChannel(
            @PathVariable Long id) {

        service.deleteChannel(id);

        return ResponseEntity.ok("Channel Deleted Successfully");
    }
}