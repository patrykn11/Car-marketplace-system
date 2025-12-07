package com.pap25.eitimoto_backend.controllers;

import com.pap25.eitimoto_backend.dto.UserProfileResponseDto;
import com.pap25.eitimoto_backend.dto.FriendRequestResponseDto;
import com.pap25.eitimoto_backend.entities.FriendRequest;
import com.pap25.eitimoto_backend.repository.FriendRequestRepository;
import com.pap25.eitimoto_backend.services.FriendRequestService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/invitations")
@RequiredArgsConstructor
public class FriendRequestController {
    private final FriendRequestService friendRequestService;

    @GetMapping
    public ResponseEntity<List<UserProfileResponseDto>> getFriendRequests() {
        return ResponseEntity.ok(friendRequestService.getUserInvitations());
    }




    @PostMapping("add/{username}")
    public ResponseEntity<FriendRequestResponseDto> addFriendRequest(@PathVariable String username){
        FriendRequestResponseDto friendRequest = friendRequestService.createInvitation(username);
        return ResponseEntity.ok(friendRequest);
    }

    @PostMapping("/accept/{username}")
    public ResponseEntity<FriendRequestResponseDto> accept(@PathVariable String username) {
        return ResponseEntity.ok(friendRequestService.acceptInvitation(username));
    }

    @PostMapping("/decline/{username}")
    public ResponseEntity<Void> decline(@PathVariable String username) {
        friendRequestService.declineInvitation(username);
        return ResponseEntity.noContent().build();
    }
}
