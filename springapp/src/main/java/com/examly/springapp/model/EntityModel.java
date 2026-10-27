package com.examly.springapp.model;

import java.time.LocalDateTime;

import javax.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "entities")
@Getter
@Setter
public class EntityModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String entityType;

    @Column(name = "entity_values", columnDefinition = "TEXT")
    private String values;

    @Column(columnDefinition = "TEXT")
    private String synonyms;

    @Column(columnDefinition = "TEXT")
    private String patterns;

    private Boolean contextual;

    private LocalDateTime createdDate;

    private LocalDateTime lastModified;

    @ManyToOne
    @JoinColumn(name = "bot_id")
    private Bot bot;

}