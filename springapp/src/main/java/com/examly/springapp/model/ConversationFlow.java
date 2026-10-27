package com.examly.springapp.model;

import java.time.LocalDateTime;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "conversation_flows")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ConversationFlow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "bot_id")
    private Bot bot;

    private String flowName;

    @Lob
    private String flowData;

    private String version;

    private Boolean isActive;

    private String createdBy;

    private LocalDateTime createdDate;

    private LocalDateTime lastModified;
}