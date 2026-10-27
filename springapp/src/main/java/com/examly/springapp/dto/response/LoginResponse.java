// package com.examly.springapp.dto.response;

// import lombok.AllArgsConstructor;
// import lombok.Getter;
// import lombok.Setter;

// @Getter
// @Setter
// @AllArgsConstructor
// public class LoginResponse {

//     private String token;

//     private String type;


// // }
package com.examly.springapp.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {

    private String token;
    private String role;

    public LoginResponse(String token, String role) {
        this.token = token;
        this.role = role;
    }
}