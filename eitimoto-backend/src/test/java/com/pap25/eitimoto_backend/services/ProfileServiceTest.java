package com.pap25.eitimoto_backend.services;

import com.pap25.eitimoto_backend.dto.AdvertisementResponseDto;
import com.pap25.eitimoto_backend.dto.UpdateUserProfileRequestDto;
import com.pap25.eitimoto_backend.dto.UserProfileResponseDto;
import com.pap25.eitimoto_backend.entities.Advertisement;
import com.pap25.eitimoto_backend.entities.User;
import com.pap25.eitimoto_backend.mapper.AdvertisementMapper;
import com.pap25.eitimoto_backend.repository.FavoriteAdvertisementRepository;
import com.pap25.eitimoto_backend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProfileServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserContextService userContextService;

    @Mock
    private AdvertisementMapper advertisementMapper;

    @Mock
    private FavoriteAdvertisementRepository favoriteAdvertisementRepository;

    @InjectMocks
    private ProfileService profileService;

    @Test
    void getMyProfile_ShouldReturnProfile_WhenUserExists() {
        String username = "testUser";
        User user = new User();
        user.setUsername(username);
        user.setEmail("test@test.com");

        when(userRepository.findByUsername(username)).thenReturn(Optional.of(user));

        UserProfileResponseDto result = profileService.getMyProfile(username);

        assertEquals(username, result.getUsername());
        assertEquals("test@test.com", result.getEmail());
    }

    @Test
    void updateMyProfile_ShouldUpdateFields() {
        String username = "testUser";
        User user = new User();
        user.setUsername(username);
        user.setEmail("old@test.com");

        UpdateUserProfileRequestDto dto = new UpdateUserProfileRequestDto();
        dto.setNewEmail("new@test.com");
        dto.setNewContactNumber("");
        dto.setNewLocation(null);

        when(userRepository.findByUsername(username)).thenReturn(Optional.of(user));

        profileService.updateMyProfile(username, dto);

        assertEquals("new@test.com", user.getEmail());
        verify(userRepository).save(user);
    }

    @Test
    void getFriendsAdvertisements_ShouldReturnAdsFromFriends() {
        User friend = new User();
        friend.setUsername("friend");
        Advertisement ad = new Advertisement();
        ad.setAdvertisementId(1L);
        friend.setAdvertisements(List.of(ad));

        when(userContextService.getFriends()).thenReturn(Set.of(friend));
        when(advertisementMapper.toDto(ad)).thenReturn(new AdvertisementResponseDto());
        when(favoriteAdvertisementRepository.countByAdvertisementId(1L)).thenReturn(10L);

        List<AdvertisementResponseDto> result = profileService.getFriendsAdvertisements();

        assertEquals(1, result.size());
        assertEquals(10L, result.get(0).getLikeCount());
    }
}
