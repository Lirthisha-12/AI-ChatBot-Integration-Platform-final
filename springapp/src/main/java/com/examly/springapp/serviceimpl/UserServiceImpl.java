package com.examly.springapp.serviceimpl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.examly.springapp.dto.request.UserRequest;
import com.examly.springapp.dto.response.UserResponse;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepository;
import com.examly.springapp.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository repository;

    public UserServiceImpl(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserResponse registerUser(UserRequest request) {

        User user = new User();

        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPasswordHash(request.getPasswordHash());
        user.setRole(request.getRole());
        user.setOrganizationId(request.getOrganizationId());
        user.setPermissions(request.getPermissions());
        user.setPreferences(request.getPreferences());
        user.setIsActive(request.getIsActive());
        user.setCreatedDate(LocalDateTime.now());
        user.setLastLogin(LocalDateTime.now());

        repository.save(user);

        return mapToResponse(user);
    }

    @Override
    public List<UserResponse> getAllUsers() {

        return repository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public UserResponse getUserById(Long id) {

        User user = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return mapToResponse(user);
    }

    @Override
    public UserResponse updateUser(Long id, UserRequest request) {

        User user = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPasswordHash(request.getPasswordHash());
        user.setRole(request.getRole());
        user.setOrganizationId(request.getOrganizationId());
        user.setPermissions(request.getPermissions());
        user.setPreferences(request.getPreferences());
        user.setIsActive(request.getIsActive());

        repository.save(user);

        return mapToResponse(user);
    }

    @Override
    public void deleteUser(Long id) {

        User user = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        repository.delete(user);
    }

    private UserResponse mapToResponse(User user) {

        UserResponse response = new UserResponse();

        response.setId(user.getId());
        response.setUsername(user.getUsername());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole());
        response.setOrganizationId(user.getOrganizationId());
        response.setPermissions(user.getPermissions());
        response.setPreferences(user.getPreferences());
        response.setIsActive(user.getIsActive());
        response.setCreatedDate(user.getCreatedDate());
        response.setLastLogin(user.getLastLogin());

        return response;
    }
}