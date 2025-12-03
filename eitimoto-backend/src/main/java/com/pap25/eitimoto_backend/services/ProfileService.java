package com.pap25.eitimoto_backend.services;

import org.springframework.stereotype.Service;

import com.pap25.eitimoto_backend.dto.AdvertisementResponseDto;
import com.pap25.eitimoto_backend.dto.CarDto;
import com.pap25.eitimoto_backend.dto.UpdateUserProfileRequestDto;
import com.pap25.eitimoto_backend.dto.UserProfileResponseDto;
import com.pap25.eitimoto_backend.entities.Advertisement;
import com.pap25.eitimoto_backend.entities.User;
import com.pap25.eitimoto_backend.repository.AdvertisementRepository;
import com.pap25.eitimoto_backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import java.util.List;


@Service
@RequiredArgsConstructor
public class ProfileService {
        private final UserRepository userRepository;
        private final AdvertisementRepository advertisementRepository;

        public UserProfileResponseDto getMyProfile(String username) { 
            User user = userRepository.findByUsername(username)  
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            return UserProfileResponseDto.builder()
                    .username(user.getUsername())
                    .build();
        }

        public UserProfileResponseDto updateMyProfile(String username, UpdateUserProfileRequestDto dto) {  
            User user = userRepository.findByUsername(username)  
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            userRepository.save(user);
            
            return UserProfileResponseDto.builder()
                    .username(user.getUsername())
                    .build();
        }
}
