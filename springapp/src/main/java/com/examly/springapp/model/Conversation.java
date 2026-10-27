package com.examly.springapp.model;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "conversations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Conversation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "bot_id")
    private Bot bot;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String channelId;

    private String sessionId;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private String status;

    private Integer satisfaction;

    private Boolean agentInvolved;

    @Lob
    private String metadata;

    @OneToMany(mappedBy = "conversation", cascade = CascadeType.ALL)
    private List<Message> messages;

    @OneToMany(mappedBy = "conversation", cascade = CascadeType.ALL)
    private List<Analytics> analytics;
}