package com.examly.springapp.dto.response;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChannelResponse {

    private Long id;

    private Long botId;

    private String botName;

    private String channelType;

    private String configuration;

    private String deploymentStatus;

    private String customization;

    private String metrics;

    private LocalDateTime lastDeployment;

}