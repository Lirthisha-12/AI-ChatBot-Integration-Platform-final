package com.examly.springapp.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ConversationFlowRequest {

    private Long botId;

    private String flowName;

    private String flowData;

    private String version;

    private Boolean isActive;

    private String createdBy;

}