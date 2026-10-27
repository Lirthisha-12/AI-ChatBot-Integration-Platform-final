package com.examly.springapp.model;

import java.time.LocalDateTime;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "analytics")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Analytics {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "bot_id")
    private Bot bot;

    @ManyToOne
    @JoinColumn(name = "conversation_id")
    private Conversation conversation;

    private String metricType;

    private Double value;

    private LocalDateTime timestamp;

    private String dimensions;

    private Boolean calculated;

    private String period;
}