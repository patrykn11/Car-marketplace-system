package com.pap25.eitimoto_backend.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pap25.eitimoto_backend.TestContainersConfig;
import com.pap25.eitimoto_backend.auth.AuthRequest;
import com.pap25.eitimoto_backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@Import(TestContainersConfig.class)
@AutoConfigureMockMvc
@Transactional
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();
    }

    @Test
    void register_ShouldReturn200AndToken_WhenRequestIsValid() throws Exception {
        AuthRequest request = AuthRequest.builder()
                .username("newuser")
                .password("password")
                .email("newuser@example.com")
                .contactNumber("123456789")
                .location("Warsaw")
                .build();

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token", notNullValue()))
                .andExpect(jsonPath("$.username", is("newuser")));
    }

    @Test
    void login_ShouldReturn200AndToken_WhenCredentialsAreCorrect() throws Exception {
        // First register a user
        AuthRequest registerRequest = AuthRequest.builder()
                .username("loginuser")
                .password("password")
                .email("loginuser@example.com")
                .contactNumber("123456789")
                .location("Warsaw")
                .build();

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerRequest)))
                .andExpect(status().isOk());

        // Then try to login
        AuthRequest loginRequest = AuthRequest.builder()
                .username("loginuser")
                .password("password")
                .build();

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token", notNullValue()))
                .andExpect(jsonPath("$.username", is("loginuser")));
    }
}
