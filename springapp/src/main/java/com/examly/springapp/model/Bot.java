package com.examly.springapp.model;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "bots")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Bot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    private String name;

    @Column(length = 1000)
    private String description;

    @Lob
    private String configuration;

    private String nlpModel;

    private String deploymentChannels;

    private String status;

    private String version;

    private LocalDateTime createdDate;

    private LocalDateTime lastModified;
    @JsonIgnore
    @OneToMany(mappedBy = "bot", cascade = CascadeType.ALL)
    private List<Intent> intents;
    @JsonIgnore
    @OneToMany(mappedBy = "bot", cascade = CascadeType.ALL)
    private List<EntityModel> entities;
    @JsonIgnore
    @OneToMany(mappedBy = "bot", cascade = CascadeType.ALL)
    private List<Conversation> conversations;
    @JsonIgnore
    @OneToMany(mappedBy = "bot", cascade = CascadeType.ALL)
    private List<Integration> integrations;
    @JsonIgnore
    @OneToMany(mappedBy = "bot", cascade = CascadeType.ALL)
    private List<Analytics> analytics;
    @JsonIgnore
    @OneToMany(mappedBy = "bot", cascade = CascadeType.ALL)
    private List<ConversationFlow> flows;
    @JsonIgnore
    @OneToMany(mappedBy = "bot", cascade = CascadeType.ALL)
    private List<Channel> channels;
}