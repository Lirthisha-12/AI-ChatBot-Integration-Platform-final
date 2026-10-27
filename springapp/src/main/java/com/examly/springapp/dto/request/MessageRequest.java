package com.examly.springapp.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageRequest {

    private Long conversationId;

    private Long senderId;

    private String senderType;

    private String content;

    private String messageType;

    private String nlpResults;

    private String sentiment;

    private Double confidence;

}