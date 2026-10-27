package com.examly.springapp.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ConversationRequest {

    private Long botId;

    private Long userId;

    private String channelId;

    private String sessionId;

    private String status;

    private Integer satisfaction;

    private Boolean agentInvolved;

    private String metadata;

}