package com.examly.springapp.model;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "chatbots")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatBot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String botName;

    private String platform;

    private String intent;

    private String response;
}