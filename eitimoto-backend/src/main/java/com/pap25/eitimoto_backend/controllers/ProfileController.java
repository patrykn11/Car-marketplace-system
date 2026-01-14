package com.pap25.eitimoto_backend.controllers;

import com.pap25.eitimoto_backend.dto.AdvertisementResponseDto;
import com.pap25.eitimoto_backend.dto.UpdateUserProfileRequestDto;
import com.pap25.eitimoto_backend.dto.UserProfileResponseDto;

import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pap25.eitimoto_backend.services.AdvertisementService;
import com.pap25.eitimoto_backend.services.ProfileService;

import lombok.RequiredArgsConstructor;
import java.util.List;
import com.pap25.eitimoto_backend.services.FriendRequestService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/profile")
public class ProfileController {

	private final ProfileService profileService;
	private final AdvertisementService advertisementService;
        private final FriendRequestService friendRequestService;
        @GetMapping("/friends")
        public ResponseEntity<List<UserProfileResponseDto>> getUserFriends() {
        	return ResponseEntity.ok(friendRequestService.getUserFriends());
        }
	@GetMapping("/me")
	public ResponseEntity<UserProfileResponseDto> getMyProfile(Authentication auth) {
		String username = auth.getName();
		UserProfileResponseDto dto = profileService.getMyProfile(username);
		return ResponseEntity.ok(dto);
	}

	@PostMapping("/edit_profile/me")
	public ResponseEntity<UserProfileResponseDto> updateMyProfile(Authentication auth, @RequestBody UpdateUserProfileRequestDto request) {
		String username = auth.getName();
		UserProfileResponseDto dto = profileService.updateMyProfile(username, request);
		return ResponseEntity.ok(dto);
	}

	@GetMapping("/user/advertisements")
	public ResponseEntity<List<AdvertisementResponseDto>> getUserAdvertisement() {
		List<AdvertisementResponseDto> ads = advertisementService.getUserAdvertisement();
		return ResponseEntity.ok(ads);
	}

        @GetMapping("/friends/advertisements")
        public ResponseEntity<List<AdvertisementResponseDto>> getUserFriendsAdvertisement() {
            return ResponseEntity.ok(profileService.getFriendsAdvertisements());
        }

}
