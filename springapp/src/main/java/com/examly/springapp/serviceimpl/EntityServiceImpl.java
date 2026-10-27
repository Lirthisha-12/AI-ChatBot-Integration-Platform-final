package com.examly.springapp.serviceimpl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.examly.springapp.dto.request.EntityRequest;
import com.examly.springapp.dto.response.EntityResponse;
import com.examly.springapp.model.Bot;
import com.examly.springapp.model.EntityModel;
import com.examly.springapp.repository.BotRepository;
import com.examly.springapp.repository.EntityRepository;
import com.examly.springapp.service.EntityService;

@Service
public class EntityServiceImpl implements EntityService {

    private final EntityRepository repository;
    private final BotRepository botRepository;

    public EntityServiceImpl(EntityRepository repository,
                             BotRepository botRepository) {
        this.repository = repository;
        this.botRepository = botRepository;
    }

    @Override
    public EntityResponse createEntity(EntityRequest request) {

        Bot bot = botRepository.findById(request.getBotId())
                .orElseThrow(() -> new RuntimeException("Bot not found"));

        EntityModel entity = new EntityModel();

        entity.setBot(bot);
        entity.setName(request.getName());
        entity.setEntityType(request.getEntityType());
        entity.setValues(request.getValues());
        entity.setSynonyms(request.getSynonyms());
        entity.setPatterns(request.getPatterns());
        entity.setContextual(request.getContextual());
        entity.setCreatedDate(LocalDateTime.now());
        entity.setLastModified(LocalDateTime.now());

        repository.save(entity);

        return mapToResponse(entity);
    }

    @Override
    public List<EntityResponse> getAllEntities() {

        return repository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public EntityResponse getEntityById(Long id) {

        EntityModel entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Entity not found"));

        return mapToResponse(entity);
    }

    @Override
    public EntityResponse updateEntity(Long id, EntityRequest request) {

        EntityModel entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Entity not found"));

        Bot bot = botRepository.findById(request.getBotId())
                .orElseThrow(() -> new RuntimeException("Bot not found"));

        entity.setBot(bot);
        entity.setName(request.getName());
        entity.setEntityType(request.getEntityType());
        entity.setValues(request.getValues());
        entity.setSynonyms(request.getSynonyms());
        entity.setPatterns(request.getPatterns());
        entity.setContextual(request.getContextual());
        entity.setLastModified(LocalDateTime.now());

        repository.save(entity);

        return mapToResponse(entity);
    }

    @Override
    public void deleteEntity(Long id) {

        EntityModel entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Entity not found"));

        repository.delete(entity);
    }

    private EntityResponse mapToResponse(EntityModel entity) {

        EntityResponse response = new EntityResponse();

        response.setId(entity.getId());
        response.setBotId(entity.getBot().getId());
        response.setBotName(entity.getBot().getName());
        response.setName(entity.getName());
        response.setEntityType(entity.getEntityType());
        response.setValues(entity.getValues());
        response.setSynonyms(entity.getSynonyms());
        response.setPatterns(entity.getPatterns());
        response.setContextual(entity.getContextual());
        response.setCreatedDate(entity.getCreatedDate());
        response.setLastModified(entity.getLastModified());

        return response;
    }
}