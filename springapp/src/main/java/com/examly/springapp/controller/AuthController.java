package com.examly.springapp.controller;
import java.time.LocalDateTime;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.examly.springapp.dto.request.LoginRequest;
import com.examly.springapp.dto.request.RegisterRequest;
import com.examly.springapp.dto.response.LoginResponse;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepository;
import com.examly.springapp.security.JwtUtil;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(AuthenticationManager authenticationManager,
                          JwtUtil jwtUtil,
                          UserRepository userRepository,
                          PasswordEncoder passwordEncoder) {

        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(
            @RequestBody RegisterRequest request) {

        // Check if email already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest()
                    .body("Email already exists");
        }

        User user = new User();

        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());

        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));

        user.setRole(request.getRole());

        user.setOrganizationId(1L);
        user.setPermissions("CREATE,READ,UPDATE,DELETE");
        user.setPreferences("Default");

        user.setCreatedDate(LocalDateTime.now());

        user.setLastLogin(null);

        user.setIsActive(true);

        userRepository.save(user);

        return ResponseEntity.ok("User Registered Successfully");
    }

    @PostMapping("/login")
public ResponseEntity<LoginResponse> login(
        @RequestBody LoginRequest request) {

    authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                    request.getEmail(),
                    request.getPassword()
            )
    );

    User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() ->
                    new RuntimeException("User not found"));

    user.setLastLogin(LocalDateTime.now());

    userRepository.save(user);

    String token = jwtUtil.generateToken(request.getEmail());

    System.out.println("================================");
    System.out.println("LOGIN EMAIL : " + user.getEmail());
    System.out.println("LOGIN ROLE  : " + user.getRole());
    System.out.println("================================");

    return ResponseEntity.ok(
            new LoginResponse(
                    token,
                    user.getRole()
            )
    );
}
}