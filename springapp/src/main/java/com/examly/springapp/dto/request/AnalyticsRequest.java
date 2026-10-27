package com.examly.springapp.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnalyticsRequest {

    private Long botId;

    private Long conversationId;

    private String metricType;

    private Double value;

    private String dimensions;

    private Boolean calculated;

    private String period;

}