package com.pap25.eitimoto_backend.controllers;

import com.pap25.eitimoto_backend.dto.AdvertisementResponseDto;
import com.pap25.eitimoto_backend.services.FavoriteAdvertisementService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityFilterAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.web.servlet.MockMvc;
import com.pap25.eitimoto_backend.services.JWTService;

import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = FavoriteAdvertisementController.class,
    excludeAutoConfiguration = {
        SecurityAutoConfiguration.class,
        SecurityFilterAutoConfiguration.class
    })
@AutoConfigureMockMvc(addFilters = false)
class FavoriteAdvertisementControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private FavoriteAdvertisementService favoriteAdvertisementService;

    @MockBean
    private JWTService jwtService;

    @MockBean
    private UserDetailsService userDetailsService;

    @Test
    void getFavoriteAdvertisements_ShouldReturnListOfIds() throws Exception {
        given(favoriteAdvertisementService.getFavoriteAdvertisements()).willReturn(List.of(1L, 2L));

        mockMvc.perform(get("/api/favorites"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0]").value(1))
                .andExpect(jsonPath("$[1]").value(2));
    }

    @Test
    void addFavoriteAdvertisement_ShouldReturnCreated_WhenAdded() throws Exception {
        Long adId = 1L;
        given(favoriteAdvertisementService.addFavoriteAdvertisement(adId)).willReturn(true);

        mockMvc.perform(post("/api/favorites/{advertisementId}", adId))
                .andExpect(status().isCreated())
                .andExpect(content().string("Advertisement added to favorites."));
    }

    @Test
    void addFavoriteAdvertisement_ShouldReturnConflict_WhenAlreadyExists() throws Exception {
        Long adId = 1L;
        given(favoriteAdvertisementService.addFavoriteAdvertisement(adId)).willReturn(false);

        mockMvc.perform(post("/api/favorites/{advertisementId}", adId))
                .andExpect(status().isConflict())
                .andExpect(content().string("Advertisement is already in favorites."));
    }
}
