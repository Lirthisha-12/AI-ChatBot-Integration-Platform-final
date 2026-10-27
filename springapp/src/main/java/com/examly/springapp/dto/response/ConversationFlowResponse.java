package com.examly.springapp.dto.response;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ConversationFlowResponse {

    private Long id;

    private Long botId;

    private String botName;

    private String flowName;

    private String flowData;

    private String version;

    private Boolean isActive;

    private String createdBy;

    private LocalDateTime createdDate;

    private LocalDateTime lastModified;

}