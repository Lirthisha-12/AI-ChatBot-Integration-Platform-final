package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.dto.request.UserRequest;
import com.examly.springapp.dto.response.UserResponse;

public interface UserService {

    UserResponse registerUser(UserRequest request);

    List<UserResponse> getAllUsers();

    UserResponse getUserById(Long id);

    UserResponse updateUser(Long id, UserRequest request);

    void deleteUser(Long id);

}