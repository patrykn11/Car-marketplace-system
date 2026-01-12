package com.pap25.eitimoto_backend.services;

import com.pap25.eitimoto_backend.dto.AdvertisementResponseDto;
import com.pap25.eitimoto_backend.entities.Advertisement;
import com.pap25.eitimoto_backend.entities.FavoriteAdvertisement;
import com.pap25.eitimoto_backend.entities.User;
import com.pap25.eitimoto_backend.mapper.AdvertisementMapper;
import com.pap25.eitimoto_backend.repository.AdvertisementRepository;
import com.pap25.eitimoto_backend.repository.FavoriteAdvertisementRepository;
import com.pap25.eitimoto_backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FavoriteAdvertisementService {

    private final FavoriteAdvertisementRepository favoriteAdvertisementRepository;
    private final UserRepository userRepository;
    private final AdvertisementRepository advertisementRepository;
    private final AdvertisementMapper advertisementMapper;

    private User getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof User) {
            String username = ((User) principal).getUsername();
            return userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));
        } else {
            throw new RuntimeException("User not authenticated");
        }
    }

    public boolean addFavoriteAdvertisement(Long advertisementId) {
        User user = getCurrentUser();
        Optional<FavoriteAdvertisement> existingFavorite =
                favoriteAdvertisementRepository.findByUserIdAndAdvertisementId(user.getId(), advertisementId);
        if (existingFavorite.isPresent()) {
            return false;
        }
        FavoriteAdvertisement favoriteAdvertisement = FavoriteAdvertisement.builder()
                .advertisementId(advertisementId)
                .user(user)
                .build();
        favoriteAdvertisementRepository.save(favoriteAdvertisement);
        return true;
    }

    @Transactional
    public boolean removeFavoriteAdvertisement(Long advertisementId) {
        User user = getCurrentUser();
        Optional<FavoriteAdvertisement> existingFavorite =
                favoriteAdvertisementRepository.findByUserIdAndAdvertisementId(user.getId(), advertisementId);
        if (existingFavorite.isEmpty()) {
            return false;
        }
        favoriteAdvertisementRepository.deleteByUserIdAndAdvertisementId(user.getId(), advertisementId);
        return true;
    }
    public List<Long> getFavoriteAdvertisements() {
        User user = getCurrentUser();
        List<FavoriteAdvertisement> favorites =
                favoriteAdvertisementRepository.findByUserId(user.getId());
        return favorites.stream().map(FavoriteAdvertisement::getAdvertisementId).collect(Collectors.toList());
    }

    public List<AdvertisementResponseDto> getFavoriteAdvertisementsDetails() {
        User user = getCurrentUser();
        List<FavoriteAdvertisement> favorites = favoriteAdvertisementRepository.findByUserId(user.getId());
        List<Long> adIds = favorites.stream()
                .map(FavoriteAdvertisement::getAdvertisementId)
                .collect(Collectors.toList());

        List<Advertisement> advertisements = advertisementRepository.findAllById(adIds);

        return advertisements.stream()
                .map(ad -> {
                    AdvertisementResponseDto dto = advertisementMapper.toDto(ad);
                    long likesCount = favoriteAdvertisementRepository.countByAdvertisementId(ad.getAdvertisementId());
                    dto.setLikeCount(likesCount);
                    return dto;
                })
                .collect(Collectors.toList());
    }
}