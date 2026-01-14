package com.pap25.eitimoto_backend.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pap25.eitimoto_backend.dto.AdvertisementDto;
import com.pap25.eitimoto_backend.dto.AdvertisementResponseDto;
import com.pap25.eitimoto_backend.services.AdvertisementService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import com.pap25.eitimoto_backend.services.JWTService;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityFilterAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;

@WebMvcTest(controllers = AdvertisementController.class,
    excludeAutoConfiguration = {
        SecurityAutoConfiguration.class,
        SecurityFilterAutoConfiguration.class
    })
@AutoConfigureMockMvc(addFilters = false)
class AdvertisementControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AdvertisementService advertisementService;

    @MockBean
    private JWTService jwtService;

    @MockBean
    private UserDetailsService userDetailsService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void getAllAdvertisements_ShouldReturnList() throws Exception {
        AdvertisementResponseDto ad1 = AdvertisementResponseDto.builder().advertisementId(1L).title("Ad 1").build();
        given(advertisementService.getAdvertisements()).willReturn(List.of(ad1));

        mockMvc.perform(get("/api/advertisements"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Ad 1"));
    }

    @Test
    void addAdvertisements_ShouldReturnCreatedAd() throws Exception {
        AdvertisementDto requestDto = new AdvertisementDto();
        requestDto.setTitle("New Ad");

        AdvertisementResponseDto responseDto = AdvertisementResponseDto.builder()
                .advertisementId(1L)
                .title("New Ad")
                .build();

        MockMultipartFile imageFile = new MockMultipartFile(
                "imageFile", "test.jpg", MediaType.IMAGE_JPEG_VALUE, "test image content".getBytes()
        );

        MockMultipartFile adJson = new MockMultipartFile(
                "advertisement", "", MediaType.APPLICATION_JSON_VALUE, objectMapper.writeValueAsBytes(requestDto)
        );

        given(advertisementService.addAdvertisement(any(AdvertisementDto.class), any())).willReturn(responseDto);

        mockMvc.perform(multipart("/api/advertisements/add")
                        .file(imageFile)
                        .file(adJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("New Ad"));
    }
}
