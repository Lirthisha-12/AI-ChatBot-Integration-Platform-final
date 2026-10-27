package com.examly.springapp.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BotResponse {

    private Long id;

    private Long ownerId;

    private String ownerName;

    private String name;

    private String description;

    private String configuration;

    private String nlpModel;

    private String deploymentChannels;

    private String status;

    private String version;

}