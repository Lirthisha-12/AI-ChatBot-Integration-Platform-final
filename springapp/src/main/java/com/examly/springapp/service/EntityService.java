package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.dto.request.EntityRequest;
import com.examly.springapp.dto.response.EntityResponse;

public interface EntityService {

    EntityResponse createEntity(EntityRequest request);

    List<EntityResponse> getAllEntities();

    EntityResponse getEntityById(Long id);

    EntityResponse updateEntity(Long id, EntityRequest request);

    void deleteEntity(Long id);

}