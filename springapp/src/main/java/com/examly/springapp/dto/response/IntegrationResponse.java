package com.examly.springapp.dto.response;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IntegrationResponse {

    private Long id;

    private Long botId;

    private String botName;

    private String integrationType;

    private String configuration;

    private String credentials;

    private String status;

    private LocalDateTime lastSync;

    private String errorLog;

    private LocalDateTime createdDate;

}