package com.examly.springapp.dto.response;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnalyticsResponse {

    private Long id;

    private Long botId;

    private String botName;

    private Long conversationId;

    private String sessionId;

    private String metricType;

    private Double value;

    private LocalDateTime timestamp;

    private String dimensions;

    private Boolean calculated;

    private String period;

}