package com.pap25.eitimoto_backend.controllers;

import com.pap25.eitimoto_backend.services.AdvertisementService;
import com.pap25.eitimoto_backend.services.JWTService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityFilterAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = StatsController.class,
    excludeAutoConfiguration = {
        SecurityAutoConfiguration.class,
        SecurityFilterAutoConfiguration.class
    })
@AutoConfigureMockMvc(addFilters = false)
class StatsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AdvertisementService advertisementService;

    @MockBean
    private JWTService jwtService;

    @MockBean
    private UserDetailsService userDetailsService;

    @Test
    void incrementViewCount_ShouldReturnOk() throws Exception {
        Long adId = 123L;

        mockMvc.perform(post("/api/advertisements/{id}/view", adId))
                .andExpect(status().isOk());

        verify(advertisementService).incrementViewCount(adId);
    }

    @Test
    void incrementContactCount_ShouldReturnOk() throws Exception {
        Long adId = 456L;

        mockMvc.perform(post("/api/advertisements/{id}/contact", adId))
                .andExpect(status().isOk());

        verify(advertisementService).incrementContactCount(adId);
    }
}
