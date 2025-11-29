package com.pap25.eitimoto_backend.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pap25.eitimoto_backend.entities.Advertisement;
import com.pap25.eitimoto_backend.repository.AdvertisementRepository;
import com.pap25.eitimoto_backend.services.JWTService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@WebMvcTest(AdvertisementController.class)
@AutoConfigureMockMvc(addFilters = false)
class AdvertisementControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private AdvertisementRepository advertisementRepository;

    @MockitoBean
    private JWTService jwtService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testReturnAdvertisement_WhenExists() throws Exception {
        Long adId = 1L;
        Advertisement ad = Advertisement.builder().advertisementId(adId).title("Test Car").build();
        when(advertisementRepository.findByAdvertisementId(adId)).thenReturn(Optional.of(ad));

        mockMvc.perform(get("/advertisements/{id}", adId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Test Car"));
    }

    @Test
    void testReturnNotFound_WhenAdvertisementDoesNotExist() throws Exception {
        Long adId = 999L;
        when(advertisementRepository.findByAdvertisementId(adId)).thenReturn(Optional.empty());

        mockMvc.perform(get("/advertisements/{id}", adId))
                .andExpect(status().isNotFound());
    }

    @Test
    void testCreateAdvertisement() throws Exception {

        Advertisement adRequest = Advertisement.builder().title("New Car").build();
        Advertisement adSaved = Advertisement.builder().advertisementId(1L).title("New Car").build();

        when(advertisementRepository.save(any(Advertisement.class))).thenReturn(adSaved);

        mockMvc.perform(post("/advertisements/add-car")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(adRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.advertisementId").value(1L));
    }
}
