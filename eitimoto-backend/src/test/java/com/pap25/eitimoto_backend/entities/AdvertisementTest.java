package com.pap25.eitimoto_backend.entities;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class AdvertisementTest {

    @Test
    void builder_ShouldConstructValidObject() {
        Car car = Car.builder().carBrand("Brand").build();
        User user = User.builder().username("User").build();

        Advertisement ad = Advertisement.builder()
                .advertisementId(1L)
                .title("Title")
                .description("Description")
                .car(car)
                .user(user)
                .viewCount(10L)
                .build();

        assertNotNull(ad);
        assertEquals(1L, ad.getAdvertisementId());
        assertEquals("Title", ad.getTitle());
        assertEquals("Brand", ad.getCar().getCarBrand());
        assertEquals("User", ad.getUser().getUsername());
        assertEquals(10L, ad.getViewCount());
    }

    @Test
    void defaults_ShouldBeSet() {
        Advertisement adFromBuilder = Advertisement.builder().build();
        assertEquals(0L, adFromBuilder.getViewCount());
    }
}
