package com.examly.springapp.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EntityRequest {

    private Long botId;

    private String name;

    private String entityType;

    private String values;

    private String synonyms;

    private String patterns;

    private Boolean contextual;

}