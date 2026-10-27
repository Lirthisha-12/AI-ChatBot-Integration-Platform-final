package com.examly.springapp.dto.response;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponse {

    private Long id;

    private String username;

    private String email;

    private String role;

    private Long organizationId;

    private String permissions;

    private String preferences;

    private Boolean isActive;

    private LocalDateTime createdDate;

    private LocalDateTime lastLogin;

}