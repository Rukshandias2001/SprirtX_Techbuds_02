package com.example.TechBuds.Controllers;

import com.example.TechBuds.Entities.User;
import com.example.TechBuds.Security.JwtTokenUtil;
import com.example.TechBuds.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthController(UserService userService, 
                         AuthenticationManager authenticationManager,
                         JwtTokenUtil jwtTokenUtil,
                         PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            // For debugging purposes
            System.out.println("Register endpoint called with username: " + user.getUsername());
            
            // Check if username already exists
            if (userService.findByUsername(user.getUsername()).isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Username already exists");
            }

            
            // Save the user to the database
            User savedUser = userService.saveUser(user, passwordEncoder);
            
            return ResponseEntity.status(HttpStatus.CREATED)
                .body("User registered successfully with id: " + savedUser.getId());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Registration failed: " + e.getMessage());
        }
    }

    @PostMapping("/authenticate")
    public String createAuthenticationToken(@RequestBody User user) throws Exception {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        final UserDetails userDetails = userService.loadUserByUsername(user.getUsername());
        return jwtTokenUtil.generateToken(userDetails);
    }

    @GetMapping("/current-user")
    public User getCurrentUser(@RequestHeader("Authorization") String token) {
        String username = jwtTokenUtil.getUsernameFromToken(token.substring(7));
        return userService.findByUsername(username)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "User not found with username: " + username));
    }

    public User getUserByUsername(@PathVariable String username) {
        return userService.findByUsername(username)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "User not found with username: " + username));
    }

    public User getUserProfile(Authentication authentication) {
        String username = authentication.getName();
        return userService.findByUsername(username)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "User not found with username: " + username));
    }
}
