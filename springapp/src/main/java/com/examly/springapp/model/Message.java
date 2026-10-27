package com.examly.springapp.model;

import java.time.LocalDateTime;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "messages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "conversation_id")
    private Conversation conversation;

    private Long senderId;

    private String senderType;

    @Lob
    private String content;

    private String messageType;

    private LocalDateTime timestamp;

    @Lob
    private String nlpResults;

    private String sentiment;

    private Double confidence;
}