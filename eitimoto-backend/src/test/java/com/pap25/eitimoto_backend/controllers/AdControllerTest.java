package com.pap25.eitimoto_backend.controllers;

import com.pap25.eitimoto_backend.services.AdService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AdController.class)
class AdControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AdService adService;

    @Test
    void shouldReturnFavoriteBrand_WhenServiceReturnsValue() throws Exception {
        String expectedBrand = "BMW";
        given(adService.favoriteCar()).willReturn(expectedBrand);

        mockMvc.perform(get("/api/Ad"))                 
                .andExpect(status().isOk())             
                .andExpect(content().string(expectedBrand)); 
        
        verify(adService).favoriteCar(); 
    }
}