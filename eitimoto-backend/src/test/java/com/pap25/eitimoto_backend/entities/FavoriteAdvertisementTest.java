package com.pap25.eitimoto_backend.entities;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class FavoriteAdvertisementTest {

    @Test
    void builder_ShouldConstructValidFavorite() {
        User user = User.builder().username("User").build();
        FavoriteAdvertisement fav = FavoriteAdvertisement.builder()
                .id(1L)
                .advertisementId(10L)
                .user(user)
                .build();

        assertNotNull(fav);
        assertEquals(1L, fav.getId());
        assertEquals(10L, fav.getAdvertisementId());
        assertEquals("User", fav.getUser().getUsername());
    }
}
