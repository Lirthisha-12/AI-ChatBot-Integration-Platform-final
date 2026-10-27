package com.examly.springapp.dto.response;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IntentResponse {

    private Long id;

    private Long botId;

    private String botName;

    private String name;

    private String description;

    private String trainingPhrases;

    private String responses;

    private String entities;

    private Double confidence;

    private Boolean isActive;

    private LocalDateTime createdDate;

}