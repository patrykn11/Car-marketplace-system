package com.pap25.eitimoto_backend.services;

import com.pap25.eitimoto_backend.entities.Advertisement;
import com.pap25.eitimoto_backend.entities.Car;
import com.pap25.eitimoto_backend.entities.FavoriteAdvertisement;
import com.pap25.eitimoto_backend.entities.User;
import com.pap25.eitimoto_backend.repository.AdvertisementRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AdServiceTest {

    @Mock
    private AdvertisementRepository advertisementRepository;

    @Mock
    private UserContextService userContextService;

    @InjectMocks
    private AdService adService;

    @Test
    void shouldReturnFavoriteBrand() {
        // Arrange
        User user = new User();
        FavoriteAdvertisement fav1 = new FavoriteAdvertisement();
        fav1.setAdvertisementId(1L);
        FavoriteAdvertisement fav2 = new FavoriteAdvertisement();
        fav2.setAdvertisementId(2L);
        FavoriteAdvertisement fav3 = new FavoriteAdvertisement();
        fav3.setAdvertisementId(3L);

        user.setFavoriteAdvertisements(List.of(fav1, fav2, fav3));

        Advertisement ad1 = mock(Advertisement.class);
        Car car1 = mock(Car.class);
        when(car1.getCarBrand()).thenReturn("Toyota");
        when(ad1.getCar()).thenReturn(car1);

        Advertisement ad2 = mock(Advertisement.class);
        Car car2 = mock(Car.class);
        when(car2.getCarBrand()).thenReturn("Toyota"); // Two Toyotas
        when(ad2.getCar()).thenReturn(car2);

        Advertisement ad3 = mock(Advertisement.class);
        Car car3 = mock(Car.class);
        when(car3.getCarBrand()).thenReturn("Honda"); // One Honda
        when(ad3.getCar()).thenReturn(car3);

        when(userContextService.getCurrentUser()).thenReturn(user);
        when(advertisementRepository.findById(1L)).thenReturn(Optional.of(ad1));
        when(advertisementRepository.findById(2L)).thenReturn(Optional.of(ad2));
        when(advertisementRepository.findById(3L)).thenReturn(Optional.of(ad3));

        // Act
        String favoriteBrand = adService.favoriteCar();

        // Assert
        assertEquals("Toyota", favoriteBrand);
    }

    @Test
    void shouldReturnUnknownWhenNoFavorites() {
        // Arrange
        User user = new User();
        user.setFavoriteAdvertisements(List.of());

        when(userContextService.getCurrentUser()).thenReturn(user);

        // Act
        String favoriteBrand = adService.favoriteCar();

        // Assert
        assertEquals("Unknown", favoriteBrand);
    }
}
