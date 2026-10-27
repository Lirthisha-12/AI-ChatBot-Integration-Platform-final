package com.examly.springapp.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.dto.request.EntityRequest;
import com.examly.springapp.dto.response.EntityResponse;
import com.examly.springapp.service.EntityService;

@RestController
@RequestMapping("/api/entities")
@CrossOrigin(origins = "*")
public class EntityController {

    private final EntityService service;

    public EntityController(EntityService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<EntityResponse> createEntity(
            @RequestBody EntityRequest request) {

        return ResponseEntity.ok(service.createEntity(request));
    }

    @GetMapping
    public ResponseEntity<List<EntityResponse>> getAllEntities() {

        return ResponseEntity.ok(service.getAllEntities());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EntityResponse> getEntityById(
            @PathVariable Long id) {

        return ResponseEntity.ok(service.getEntityById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EntityResponse> updateEntity(
            @PathVariable Long id,
            @RequestBody EntityRequest request) {

        return ResponseEntity.ok(service.updateEntity(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEntity(
            @PathVariable Long id) {

        service.deleteEntity(id);

        return ResponseEntity.ok("Entity Deleted Successfully");
    }
}