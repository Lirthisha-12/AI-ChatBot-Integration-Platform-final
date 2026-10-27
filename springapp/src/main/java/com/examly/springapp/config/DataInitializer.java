package com.examly.springapp.config;
import java.time.LocalDateTime;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepository;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner createAdmin(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {

            if (userRepository.findByEmail("admin@chatbot.com").isEmpty()) {

                User admin = new User();

                admin.setUsername("Administrator");
                admin.setEmail("admin@chatbot.com");

                admin.setPasswordHash(
                    passwordEncoder.encode("Admin@123")
                );

                admin.setRole("ADMIN");
                admin.setOrganizationId(1L);
                admin.setPermissions("CREATE,READ,UPDATE,DELETE");
                admin.setPreferences("Default");
                admin.setCreatedDate(LocalDateTime.now());
                admin.setLastLogin(null);
                admin.setIsActive(true);

                userRepository.save(admin);

                System.out.println("Default Admin Created");
            }
        };
    }
}