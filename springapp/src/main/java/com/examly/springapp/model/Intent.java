package com.examly.springapp.model;

import java.time.LocalDateTime;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "intents")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Intent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "bot_id")
    private Bot bot;

    private String name;

    private String description;

    @Lob
    private String trainingPhrases;

    @Lob
    private String responses;

    @Lob
    private String entities;

    private Double confidence;

    private Boolean isActive;

    private LocalDateTime createdDate;
}