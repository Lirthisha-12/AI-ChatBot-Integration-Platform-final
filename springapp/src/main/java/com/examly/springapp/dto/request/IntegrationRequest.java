package com.examly.springapp.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IntegrationRequest {

    private Long botId;

    private String integrationType;

    private String configuration;

    private String credentials;

    private String status;

    private String errorLog;

}