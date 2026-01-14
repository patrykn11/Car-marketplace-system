package com.pap25.eitimoto_backend.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pap25.eitimoto_backend.dto.AdvertisementResponseDto;
import com.pap25.eitimoto_backend.dto.UpdateUserProfileRequestDto;
import com.pap25.eitimoto_backend.dto.UserProfileResponseDto;
import com.pap25.eitimoto_backend.services.AdvertisementService;
import com.pap25.eitimoto_backend.services.FriendRequestService;
import com.pap25.eitimoto_backend.services.JWTService;
import com.pap25.eitimoto_backend.services.ProfileService;
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

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = ProfileController.class,
    excludeAutoConfiguration = {
        SecurityAutoConfiguration.class,
        SecurityFilterAutoConfiguration.class
    })
@AutoConfigureMockMvc(addFilters = false)
class ProfileControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProfileService profileService;

    @MockBean
    private AdvertisementService advertisementService;

    @MockBean
    private FriendRequestService friendRequestService;

    @MockBean
    private JWTService jwtService;

    @MockBean
    private UserDetailsService userDetailsService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void getUserFriends_ShouldReturnListOfFriends() throws Exception {
        UserProfileResponseDto friend = UserProfileResponseDto.builder().username("friend").build();
        given(friendRequestService.getUserFriends()).willReturn(List.of(friend));

        mockMvc.perform(get("/api/profile/friends"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].username").value("friend"));
    }

    @Test
    void getUserAdvertisement_ShouldReturnListOfAds() throws Exception {
        AdvertisementResponseDto ad = AdvertisementResponseDto.builder().advertisementId(1L).title("My Ad").build();
        given(advertisementService.getUserAdvertisement()).willReturn(List.of(ad));

        mockMvc.perform(get("/api/profile/user/advertisements"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("My Ad"));
    }
}
