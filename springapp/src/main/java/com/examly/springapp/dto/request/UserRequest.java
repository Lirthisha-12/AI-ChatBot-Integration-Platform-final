package com.examly.springapp.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequest {

    private String username;

    private String email;

    private String passwordHash;

    private String role;

    private Long organizationId;

    private String permissions;

    private String preferences;

    private Boolean isActive;

}