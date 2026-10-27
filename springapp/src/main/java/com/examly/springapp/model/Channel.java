package com.examly.springapp.model;

import java.time.LocalDateTime;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "channels")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Channel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "bot_id")
    private Bot bot;

    private String channelType;

    @Lob
    private String configuration;

    private String deploymentStatus;

    @Lob
    private String customization;

    @Lob
    private String metrics;

    private LocalDateTime lastDeployment;
}