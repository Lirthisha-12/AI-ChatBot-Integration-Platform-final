package com.examly.springapp.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IntentRequest {

    private Long botId;

    private String name;

    private String description;

    private String trainingPhrases;

    private String responses;

    private String entities;

    private Double confidence;

    private Boolean isActive;

}