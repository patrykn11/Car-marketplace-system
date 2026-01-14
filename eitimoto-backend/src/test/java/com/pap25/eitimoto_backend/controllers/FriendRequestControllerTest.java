package com.pap25.eitimoto_backend.controllers;

import com.pap25.eitimoto_backend.dto.FriendRequestResponseDto;
import com.pap25.eitimoto_backend.dto.UserProfileResponseDto;
import com.pap25.eitimoto_backend.services.FriendRequestService;
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

import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = FriendRequestController.class,
    excludeAutoConfiguration = {
        SecurityAutoConfiguration.class,
        SecurityFilterAutoConfiguration.class
    })
@AutoConfigureMockMvc(addFilters = false)
class FriendRequestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private FriendRequestService friendRequestService;

    @MockBean
    private JWTService jwtService;

    @MockBean
    private UserDetailsService userDetailsService;

    @Test
    void getFriendRequests_ShouldReturnList() throws Exception {
        UserProfileResponseDto user = UserProfileResponseDto.builder().username("friend").build();
        given(friendRequestService.getUserInvitations()).willReturn(List.of(user));

        mockMvc.perform(get("/api/invitations"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].username").value("friend"));
    }

    @Test
    void addFriendRequest_ShouldReturnDto() throws Exception {
        String username = "targetUser";
        FriendRequestResponseDto response = FriendRequestResponseDto.builder().build();
        given(friendRequestService.createInvitation(username)).willReturn(response);

        mockMvc.perform(post("/api/invitations/add/{username}", username))
                .andExpect(status().isOk());
    }

    @Test
    void accept_ShouldReturnDto() throws Exception {
        String username = "friend";
        FriendRequestResponseDto response = FriendRequestResponseDto.builder().build();
        given(friendRequestService.acceptInvitation(username)).willReturn(response);

        mockMvc.perform(post("/api/invitations/accept/{username}", username))
                .andExpect(status().isOk());
    }

    @Test
    void decline_ShouldReturnNoContent() throws Exception {
        String username = "friend";

        mockMvc.perform(post("/api/invitations/decline/{username}", username))
                .andExpect(status().isNoContent());

        verify(friendRequestService).declineInvitation(username);
    }
}
