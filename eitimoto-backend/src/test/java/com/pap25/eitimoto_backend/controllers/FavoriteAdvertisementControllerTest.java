package com.pap25.eitimoto_backend.controllers;

import com.pap25.eitimoto_backend.services.FavoriteAdvertisementService;
import com.pap25.eitimoto_backend.services.JWTService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@WebMvcTest(FavoriteAdvertisementController.class)
@AutoConfigureMockMvc(addFilters = false)
class FavoriteAdvertisementControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private FavoriteAdvertisementService favService;

    @MockitoBean
    private JWTService jwtService;

    @Test
    void shouldReturnFavoritesList() throws Exception {
        when(favService.getFavoriteAdvertisements()).thenReturn(List.of(10L, 20L));

        mockMvc.perform(get("/api/favorites"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(2))
                .andExpect(jsonPath("$[0]").value(10L));
    }

    @Test
    void shouldReturnCreated_WhenFavoriteAddedSuccessfully() throws Exception {
        Long adId = 1L;
        when(favService.addFavoriteAdvertisement(adId)).thenReturn(true);

        mockMvc.perform(post("/api/favorites/{id}", adId))
                .andExpect(status().isCreated())
                .andExpect(content().string("Advertisement added to favorites."));
    }

    @Test
    void shouldReturnConflict_WhenFavoriteAlreadyExists() throws Exception {
        Long adId = 1L;
        when(favService.addFavoriteAdvertisement(adId)).thenReturn(false);

        mockMvc.perform(post("/api/favorites/{id}", adId))
                .andExpect(status().isConflict())
                .andExpect(content().string("Advertisement is already in favorites."));
    }

    @Test
    void shouldReturnOk_WhenFavoriteRemoved() throws Exception {
        Long adId = 1L;
        when(favService.removeFavoriteAdvertisement(adId)).thenReturn(true);

        mockMvc.perform(delete("/api/favorites/{id}", adId))
                .andExpect(status().isOk())
                .andExpect(content().string("Advertisement removed from favorites."));
    }

    @Test
    void shouldReturnNotFound_WhenRemovingNonExistingFavorite() throws Exception {
        Long adId = 1L;
        when(favService.removeFavoriteAdvertisement(adId)).thenReturn(false);

        mockMvc.perform(delete("/api/favorites/{id}", adId))
                .andExpect(status().isNotFound())
                .andExpect(content().string("Advertisement not found in favorites."));
    }
}