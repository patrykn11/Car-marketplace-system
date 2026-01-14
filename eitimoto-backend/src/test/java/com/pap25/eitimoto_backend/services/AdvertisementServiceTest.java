package com.pap25.eitimoto_backend.services;

import com.pap25.eitimoto_backend.dto.AdvertisementResponseDto;
import com.pap25.eitimoto_backend.entities.Advertisement;
import com.pap25.eitimoto_backend.entities.User;
import com.pap25.eitimoto_backend.mapper.AdvertisementMapper;
import com.pap25.eitimoto_backend.repository.AdvertisementRepository;
import com.pap25.eitimoto_backend.repository.CarRepository;
import com.pap25.eitimoto_backend.repository.FavoriteAdvertisementRepository;
import com.pap25.eitimoto_backend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AdvertisementServiceTest {

    @Mock
    private AdvertisementRepository advertisementRepository;
    @Mock
    private FavoriteAdvertisementRepository favoriteAdvertisementRepository;
    @Mock
    private UserContextService userContextService;
    @Mock
    private AdvertisementMapper advertisementMapper;
    @Mock
    private CarRepository carRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private SimpMessagingTemplate messagingTemplate;
    @Mock
    private EmbeddingService embeddingService;

    @InjectMocks
    private AdvertisementService advertisementService;

    @Test
    void getAdvertisements_ShouldReturnListOfDtos() {
        Advertisement ad = new Advertisement();
        ad.setAdvertisementId(1L);
        when(advertisementRepository.findAll()).thenReturn(List.of(ad));

        AdvertisementResponseDto dto = new AdvertisementResponseDto();
        when(advertisementMapper.toDto(ad)).thenReturn(dto);
        when(favoriteAdvertisementRepository.countByAdvertisementId(1L)).thenReturn(5L);

        List<AdvertisementResponseDto> result = advertisementService.getAdvertisements();

        assertEquals(1, result.size());
        assertEquals(5L, result.get(0).getLikeCount());
    }

    @Test
    void removeAdvertisement_ShouldDelete_WhenUserIsOwner() {
        Long adId = 1L;
        User owner = new User();
        owner.setId(10L);
        owner.setUsername("owner");

        Advertisement ad = new Advertisement();
        ad.setAdvertisementId(adId);
        ad.setUser(owner);
        ad.setTitle("Test Ad");

        when(userContextService.getCurrentUser()).thenReturn(owner);
        when(advertisementRepository.findById(adId)).thenReturn(Optional.of(ad));
        when(advertisementMapper.toDto(ad)).thenReturn(new AdvertisementResponseDto());

        advertisementService.removeAdvertisement(adId);

        verify(favoriteAdvertisementRepository).deleteByAdvertisementId(adId);
        verify(advertisementRepository).delete(ad);
    }

    @Test
    void removeAdvertisement_ShouldThrowException_WhenUserIsNotOwner() {
        Long adId = 1L;
        User owner = new User();
        owner.setId(10L);

        User otherUser = new User();
        otherUser.setId(99L); // Different ID

        Advertisement ad = new Advertisement();
        ad.setAdvertisementId(adId);
        ad.setUser(owner); // Owned by 'owner'

        when(userContextService.getCurrentUser()).thenReturn(otherUser); // Context is 'otherUser'
        when(advertisementRepository.findById(adId)).thenReturn(Optional.of(ad));

        assertThrows(SecurityException.class, () -> advertisementService.removeAdvertisement(adId));
        verify(advertisementRepository, never()).delete(any());
    }
}
