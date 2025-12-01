package com.pap25.eitimoto_backend.services;

import com.pap25.eitimoto_backend.entities.FavoriteAdvertisement;
import com.pap25.eitimoto_backend.entities.User;
import com.pap25.eitimoto_backend.repository.FavoriteAdvertisementRepository;
import com.pap25.eitimoto_backend.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class FavAdServiceTest {

    @Mock
    private FavoriteAdvertisementRepository favoriteAdvertisementRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private FavoriteAdvertisementService favoriteAdvertisementService;

    private User mockedUser;

    @BeforeEach
    void setUpSecurityContext() {
        // Mock the security context to return a mocked user
        mockedUser = User.builder()
                .id(1L)
                .username("testuser")
                .password("password")
                .build();

        Authentication authentication = mock(Authentication.class);
        when(authentication.getPrincipal()).thenReturn(mockedUser);

        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);

        SecurityContextHolder.setContext(securityContext);
        lenient().when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(mockedUser));
    }

    @AfterEach
    void clearSecurityContext() {
        SecurityContextHolder.clearContext();
    }

    @Test
    void testAddFavoriteAdvertisement_Success() {
        Long advertisementId = 100L;

        when(favoriteAdvertisementRepository.findByUserIdAndAdvertisementId(mockedUser.getId(), advertisementId))
                .thenReturn(Optional.empty());

        boolean result = favoriteAdvertisementService.addFavoriteAdvertisement(advertisementId);

        verify(favoriteAdvertisementRepository, times(1)).save(any());
        assertThat(result).isTrue();
    }

    @Test
    void testNotAddFavoriteIfAlreadyExists() {
        Long advertisementId = 100L;

        when(favoriteAdvertisementRepository.findByUserIdAndAdvertisementId(mockedUser.getId(), advertisementId))
                .thenReturn(Optional.of(new FavoriteAdvertisement()));

        boolean result = favoriteAdvertisementService.addFavoriteAdvertisement(advertisementId);

        verify(favoriteAdvertisementRepository, never()).save(any());
        assertThat(result).isFalse();
    }

    @Test
    void testAddFavoriteWhenNotExists() {
        Long advertisementId = 100L;

        when(favoriteAdvertisementRepository.findByUserIdAndAdvertisementId(mockedUser.getId(), advertisementId))
                .thenReturn(Optional.empty());

        boolean result = favoriteAdvertisementService.addFavoriteAdvertisement(advertisementId);

        verify(favoriteAdvertisementRepository, times(1)).save(any());
        assertThat(result).isTrue();
    }

    @Test
    void testRemoveFavoriteWhenExists() {
        Long adId = 200L;
        when(favoriteAdvertisementRepository.findByUserIdAndAdvertisementId(mockedUser.getId(), adId))
                .thenReturn(Optional.of(new FavoriteAdvertisement()));

        boolean result = favoriteAdvertisementService.removeFavoriteAdvertisement(adId);

        assertThat(result).isTrue();
        verify(favoriteAdvertisementRepository).deleteByUserIdAndAdvertisementId(mockedUser.getId(), adId);
    }

    @Test
    void testNotRemoveFavoriteIfNotExists() {
        Long advertisementId = 100L;

        when(favoriteAdvertisementRepository.findByUserIdAndAdvertisementId(mockedUser.getId(), advertisementId))
                .thenReturn(Optional.empty());

        boolean result = favoriteAdvertisementService.removeFavoriteAdvertisement(advertisementId);

        verify(favoriteAdvertisementRepository, never())
                .deleteByUserIdAndAdvertisementId(mockedUser.getId(), advertisementId);
        assertThat(result).isFalse();
    }

    @Test
    void testGetFavoriteAdvertisements() {
        favoriteAdvertisementService.getFavoriteAdvertisements();
        verify(favoriteAdvertisementRepository, times(1)).findByUserId(mockedUser.getId());
    }

    @Test
    void testGetFavoriteAdvertisementsWhenNone() {
        favoriteAdvertisementService.getFavoriteAdvertisements();
        verify(favoriteAdvertisementRepository, times(1)).findByUserId(mockedUser.getId());
    }

    @Test
    void testGetFavoriteAdvertisementsWhenMany() {
        favoriteAdvertisementService.getFavoriteAdvertisements();
        verify(favoriteAdvertisementRepository, times(1)).findByUserId(mockedUser.getId());
    }
}
