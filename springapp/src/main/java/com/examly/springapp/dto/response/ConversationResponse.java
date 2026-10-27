package com.examly.springapp.dto.response;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ConversationResponse {

    private Long id;

    private Long botId;

    private String botName;

    private Long userId;

    private String username;

    private String channelId;

    private String sessionId;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private String status;

    private Integer satisfaction;

    private Boolean agentInvolved;

    private String metadata;

}