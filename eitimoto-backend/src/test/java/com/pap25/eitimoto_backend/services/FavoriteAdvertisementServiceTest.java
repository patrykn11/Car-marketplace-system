package com.pap25.eitimoto_backend.services;

import com.pap25.eitimoto_backend.dto.AdvertisementResponseDto;
import com.pap25.eitimoto_backend.entities.Advertisement;
import com.pap25.eitimoto_backend.entities.FavoriteAdvertisement;
import com.pap25.eitimoto_backend.entities.User;
import com.pap25.eitimoto_backend.mapper.AdvertisementMapper;
import com.pap25.eitimoto_backend.repository.AdvertisementRepository;
import com.pap25.eitimoto_backend.repository.FavoriteAdvertisementRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class FavoriteAdvertisementServiceTest {

    @Mock
    private FavoriteAdvertisementRepository favoriteAdvertisementRepository;
    @Mock
    private AdvertisementRepository advertisementRepository;
    @Mock
    private AdvertisementMapper advertisementMapper;
    @Mock
    private UserContextService userContextService;

    @InjectMocks
    private FavoriteAdvertisementService service;

    @Test
    void addFavorite_ShouldAddAndIncrementLikes_WhenNotAlreadyFavorite() {
        Long adId = 1L;
        User user = new User();
        user.setId(10L);
        Advertisement ad = new Advertisement();
        ad.setAdvertisementId(adId);
        ad.setLikeCount(5L);

        when(userContextService.getCurrentUser()).thenReturn(user);
        when(favoriteAdvertisementRepository.findByUserIdAndAdvertisementId(user.getId(), adId))
                .thenReturn(Optional.empty());
        when(advertisementRepository.findById(adId)).thenReturn(Optional.of(ad));

        boolean result = service.addFavoriteAdvertisement(adId);

        assertTrue(result);
        assertEquals(6L, ad.getLikeCount());
        verify(favoriteAdvertisementRepository).save(any(FavoriteAdvertisement.class));
        verify(advertisementRepository).save(ad);
    }

    @Test
    void addFavorite_ShouldReturnFalse_WhenAlreadyFavorite() {
        Long adId = 1L;
        User user = new User();
        user.setId(10L);

        when(userContextService.getCurrentUser()).thenReturn(user);
        when(favoriteAdvertisementRepository.findByUserIdAndAdvertisementId(user.getId(), adId))
                .thenReturn(Optional.of(new FavoriteAdvertisement()));

        boolean result = service.addFavoriteAdvertisement(adId);

        assertFalse(result);
        verify(favoriteAdvertisementRepository, never()).save(any());
        verify(advertisementRepository, never()).save(any());
    }

    @Test
    void removeFavorite_ShouldRemoveAndDecrementLikes_WhenFavoriteExists() {
        Long adId = 1L;
        User user = new User();
        user.setId(10L);
        Advertisement ad = new Advertisement();
        ad.setAdvertisementId(adId);
        ad.setLikeCount(5L);

        when(userContextService.getCurrentUser()).thenReturn(user);
        when(favoriteAdvertisementRepository.findByUserIdAndAdvertisementId(user.getId(), adId))
                .thenReturn(Optional.of(new FavoriteAdvertisement()));
        when(advertisementRepository.findById(adId)).thenReturn(Optional.of(ad));

        boolean result = service.removeFavoriteAdvertisement(adId);

        assertTrue(result);
        assertEquals(4L, ad.getLikeCount());
        verify(favoriteAdvertisementRepository).deleteByUserIdAndAdvertisementId(user.getId(), adId);
    }

    @Test
    void getFavoriteAdvertisementsDetails_ShouldReturnDtoList() {
        User user = new User();
        user.setId(10L);
        when(userContextService.getCurrentUser()).thenReturn(user);

        FavoriteAdvertisement fav = new FavoriteAdvertisement();
        fav.setAdvertisementId(1L);
        when(favoriteAdvertisementRepository.findByUserId(user.getId())).thenReturn(List.of(fav));

        Advertisement ad = new Advertisement();
        ad.setAdvertisementId(1L);
        when(advertisementRepository.findAllById(List.of(1L))).thenReturn(List.of(ad));

        when(advertisementMapper.toDto(ad)).thenReturn(new AdvertisementResponseDto());
        when(favoriteAdvertisementRepository.countByAdvertisementId(1L)).thenReturn(100L);

        List<AdvertisementResponseDto> result = service.getFavoriteAdvertisementsDetails();

        assertEquals(1, result.size());
        assertEquals(100L, result.get(0).getLikeCount());
    }
}
