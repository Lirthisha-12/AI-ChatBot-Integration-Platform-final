package com.examly.springapp.dto.response;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageResponse {

    private Long id;

    private Long conversationId;

    private String sessionId;

    private Long senderId;

    private String senderType;

    private String content;

    private String messageType;

    private LocalDateTime timestamp;

    private String nlpResults;

    private String sentiment;

    private Double confidence;

}