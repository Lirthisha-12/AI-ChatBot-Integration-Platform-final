package com.examly.springapp.model;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.*;


import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    private String passwordHash;

    private String role;

    private Long organizationId;

    @Column(length = 1000)
    private String permissions;

    @Column(length = 1000)
    private String preferences;

    private LocalDateTime createdDate;

    private LocalDateTime lastLogin;

    private Boolean isActive;
    
    @JsonManagedReference
    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private List<Bot> bots;
}