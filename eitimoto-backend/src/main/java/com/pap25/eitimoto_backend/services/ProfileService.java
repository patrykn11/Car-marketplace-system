package com.pap25.eitimoto_backend.services;

import com.pap25.eitimoto_backend.dto.*;
import com.pap25.eitimoto_backend.entities.FriendRequest;
import com.pap25.eitimoto_backend.entities.FriendshipStatus;
import com.pap25.eitimoto_backend.mapper.AdvertisementMapper;
import com.pap25.eitimoto_backend.repository.FriendRequestRepository;
import org.springframework.stereotype.Service;

import com.pap25.eitimoto_backend.entities.Advertisement;
import com.pap25.eitimoto_backend.entities.User;
import com.pap25.eitimoto_backend.repository.AdvertisementRepository;
import com.pap25.eitimoto_backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class ProfileService {
        private final UserRepository userRepository;
        private final AdvertisementRepository advertisementRepository;
        private final UserContextService userContextService;
        private final FriendRequestRepository friendRequestRepository;
        private final AdvertisementMapper advertisementMapper;

        public UserProfileResponseDto getMyProfile(String username) {
            User user = userRepository.findByUsername(username)  
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            return UserProfileResponseDto.builder()
                    .username(user.getUsername())
                    .email(user.getEmail())
                    .contactNumber(user.getContactNumber())
                    .location(user.getLocation())
                    .build();
        }

        public UserProfileResponseDto updateMyProfile(String username, UpdateUserProfileRequestDto dto) {  
            User user = userRepository.findByUsername(username)
                        .orElseThrow(() -> new RuntimeException("User not found"));

            if (!"".equals(dto.getNewEmail())) user.setEmail(dto.getNewEmail());
            if (!"".equals(dto.getNewContactNumber())) user.setContactNumber(dto.getNewContactNumber());
            if (!"".equals(dto.getNewLocation())) user.setLocation(dto.getNewLocation());

            userRepository.save(user);
            
            return UserProfileResponseDto.builder()
                    .username(user.getUsername())
                    .build();
        }


        public List<AdvertisementResponseDto> getFriendsAdvertisements() {
            User user = userContextService.getCurrentUser();
            return userContextService.getFriends().stream()
                    .flatMap(friend -> friend.getAdvertisements().stream())
                    .map(ad -> advertisementMapper.toDto(ad))
                    .collect(Collectors.toList());


        }
}
