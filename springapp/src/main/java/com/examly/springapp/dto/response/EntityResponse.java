package com.examly.springapp.dto.response;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EntityResponse {

    private Long id;

    private Long botId;

    private String botName;

    private String name;

    private String entityType;

    private String values;

    private String synonyms;

    private String patterns;

    private Boolean contextual;

    private LocalDateTime createdDate;

    private LocalDateTime lastModified;

}