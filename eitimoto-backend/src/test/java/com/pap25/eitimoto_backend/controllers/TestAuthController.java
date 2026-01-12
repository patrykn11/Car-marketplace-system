package com.pap25.eitimoto_backend.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pap25.eitimoto_backend.auth.AuthRequest;
import com.pap25.eitimoto_backend.auth.AuthResponse;
import com.pap25.eitimoto_backend.services.AuthService;
import com.pap25.eitimoto_backend.services.JWTService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(AuthController.class)
@AutoConfigureMockMvc(addFilters = false)
public class TestAuthController {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthService authService;

    @MockBean
    private JWTService jwtService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testRegisterUser_AndReturnToken() throws Exception {
        AuthRequest request = new AuthRequest();
        request.setUsername("newuser");
        request.setPassword("password");
        AuthResponse response = AuthResponse.builder().token("token123").build();

        when(authService.register(any(AuthRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("token123")); // Sprawdzamy pole w JSON
    }

    @Test
    void testLoginUser_AndReturnToken() throws Exception {
        AuthRequest request = new AuthRequest();
        request.setUsername("existinguser");
        request.setPassword("password");
        AuthResponse response = AuthResponse.builder().token("loginToken").build();

        when(authService.login(any(AuthRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("loginToken"));
    }

    @Test
    void testReturnBadRequest_ForMalformedJson() throws Exception {
        String malformedJson = "{ \"username\": \"user\", \"password\": }";

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(malformedJson))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testReturnBadRequest_WhenJsonIsMalformed() throws Exception {
        String brokenJson = "{ \"username\": \"test\", \"pass\"... ups, brak klamry";

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(brokenJson))
                .andExpect(status().isBadRequest());
    }
}
