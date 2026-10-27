package com.examly.springapp.model;

import java.time.LocalDateTime;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "integrations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Integration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "bot_id")
    private Bot bot;

    private String integrationType;

    @Lob
    private String configuration;

    @Lob
    private String credentials;

    private String status;

    private LocalDateTime lastSync;

    @Lob
    private String errorLog;

    private LocalDateTime createdDate;
}