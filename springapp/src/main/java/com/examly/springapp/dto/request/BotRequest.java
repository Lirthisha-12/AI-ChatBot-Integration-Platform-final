package com.examly.springapp.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BotRequest {

    private Long ownerId;

    private String name;

    private String description;

    private String configuration;

    private String nlpModel;

    private String deploymentChannels;

    private String status;

    private String version;

}