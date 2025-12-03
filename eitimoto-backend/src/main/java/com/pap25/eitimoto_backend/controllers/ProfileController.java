package com.pap25.eitimoto_backend.controllers;

import com.pap25.eitimoto_backend.dto.AdvertisementDto;
import com.pap25.eitimoto_backend.dto.AdvertisementResponseDto;
import com.pap25.eitimoto_backend.dto.UpdateUserProfileRequestDto;
import com.pap25.eitimoto_backend.dto.UserProfileResponseDto;
import com.pap25.eitimoto_backend.entities.Advertisement;
import com.pap25.eitimoto_backend.entities.User;

import org.apache.catalina.connector.Response;
import org.springframework.security.core.Authentication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.pap25.eitimoto_backend.services.AdvertisementService;
import com.pap25.eitimoto_backend.services.ProfileService;
import com.pap25.eitimoto_backend.services.UserContextService;
import com.pap25.eitimoto_backend.repository.AdvertisementRepository;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/profile")
public class ProfileController {
		
		private final ProfileService profileService;
		private final AdvertisementService advertisementService;

		@GetMapping("/me")
		public ResponseEntity<UserProfileResponseDto> getMyProfile(Authentication auth) {
				String username = auth.getName();
				UserProfileResponseDto dto = profileService.getMyProfile(username);
				return ResponseEntity.ok(dto);
		}

		@PostMapping("/me")
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

}
