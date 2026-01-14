package com.pap25.eitimoto_backend.mapper;

import com.pap25.eitimoto_backend.dto.AdvertisementResponseDto;
import com.pap25.eitimoto_backend.entities.Advertisement;
import com.pap25.eitimoto_backend.entities.Car;
import com.pap25.eitimoto_backend.entities.User;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class AdvertisementMapperTest {

    private final AdvertisementMapper advertisementMapper = new AdvertisementMapper();

    @Test
    void toDto_ShouldMapFields() {
        User user = User.builder()
                .username("testUser")
                .contactNumber("123456789")
                .build();

        Car car = Car.builder()
                .carBrand("BMW")
                .carModel("M3")
                .carBodyType("Sedan")
                .productionYear(2022)
                .mileage(1000)
                .price(100000)
                .fuelType("Petrol")
                .transmission("Automatic")
                .power(500)
                .carColor("Blue")
                .engineCapacity(3.0)
                .build();

        Advertisement ad = Advertisement.builder()
                .advertisementId(1L)
                .title("Legendary M3")
                .description("Best car")
                .location("Warsaw")
                .car(car)
                .user(user)
                .viewCount(10L)
                .contactCount(5L)
                .image(new byte[]{1, 2, 3})
                .build();

        AdvertisementResponseDto dto = advertisementMapper.toDto(ad);

        assertEquals(1L, dto.getAdvertisementId());
        assertEquals("Legendary M3", dto.getTitle());
        assertEquals("Best car", dto.getDescription());
        assertEquals("Warsaw", dto.getLocation());
        assertEquals("testUser", dto.getUsername());
        assertEquals("123456789", dto.getContactNumber());
        assertEquals(10L, dto.getViewCount());
        assertEquals(5L, dto.getContactCount());
        assertEquals(0L, dto.getLikeCount());
        assertTrue(dto.isHasImage());

        assertNotNull(dto.getCarData());
        assertEquals("BMW", dto.getCarData().getCarBrand());
        assertEquals("M3", dto.getCarData().getCarModel());
        assertEquals(500, dto.getCarData().getPower());
    }

    @Test
    void toDto_ShouldHandleNoImage() {
        User user = User.builder().username("u").build();
        Car car = Car.builder().carBrand("B").carModel("M").carBodyType("S").productionYear(2020).price(1).mileage(1).fuelType("F").transmission("T").power(1).carColor("C").engineCapacity(1.0).build();
        Advertisement ad = Advertisement.builder()
                .car(car)
                .user(user)
                .image(null)
                .build();

        AdvertisementResponseDto dto = advertisementMapper.toDto(ad);

        assertFalse(dto.isHasImage());
    }
}
