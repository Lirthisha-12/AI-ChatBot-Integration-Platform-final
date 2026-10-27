package com.examly.springapp.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChannelRequest {

    private Long botId;

    private String channelType;

    private String configuration;

    private String deploymentStatus;

    private String customization;

    private String metrics;

}