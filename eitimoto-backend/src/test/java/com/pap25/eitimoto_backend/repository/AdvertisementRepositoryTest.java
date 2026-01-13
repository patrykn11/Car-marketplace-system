package com.pap25.eitimoto_backend.repository;

import com.pap25.eitimoto_backend.entities.Advertisement;
import com.pap25.eitimoto_backend.entities.Car;
import com.pap25.eitimoto_backend.entities.Role;
import com.pap25.eitimoto_backend.entities.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Import(com.pap25.eitimoto_backend.TestContainersConfig.class)
@Transactional
class AdvertisementRepositoryTest {

    @Autowired
    private AdvertisementRepository advertisementRepository;

    @Autowired
    private UserRepository userRepository;

    @Test
    void testSaveAndFindAdvertisement() {
        User user = User.builder()
                .username("aduser")
                .password("password")
                .email("aduser@example.com")
                .contactNumber("111222333")
                .location("Warsaw")
                .role(Role.USER)
                .build();
        userRepository.save(user);

        Car car = Car.builder()
                .carBrand("Toyota")
                .carModel("Corolla")
                .carBodyType("Sedan")
                .productionYear(2020)
                .price(50000)
                .mileage(10000)
                .fuelType("Petrol")
                .transmission("Manual")
                .power(100)
                .carColor("Black")
                .engineCapacity(1.6)
                .build();

        Advertisement ad = Advertisement.builder()
                .title("Nice Toyota for sale")
                .description("Very good car")
                .location("Warsaw")
                .user(user)
                .car(car)
                .build();

        Advertisement savedAd = advertisementRepository.save(ad);

        assertNotNull(savedAd.getAdvertisementId());
        assertEquals("Nice Toyota for sale", savedAd.getTitle());
        assertNotNull(savedAd.getCar().getCarId());
        assertEquals("Toyota", savedAd.getCar().getCarBrand());

        List<Advertisement> foundAds = advertisementRepository.findByUserId(user.getId());
        assertFalse(foundAds.isEmpty());
        assertEquals(1, foundAds.size());
        assertEquals(savedAd.getAdvertisementId(), foundAds.get(0).getAdvertisementId());
    }

    @Test
    void testFindByUserUsername() {
        User user = User.builder()
                .username("aduser2")
                .password("password")
                .email("aduser2@example.com")
                .contactNumber("111222333")
                .location("Krakow")
                .role(Role.USER)
                .build();
        userRepository.save(user);

        Car car = Car.builder()
                .carBrand("Honda")
                .carModel("Civic")
                .carBodyType("Hatchback")
                .productionYear(2019)
                .price(45000)
                .mileage(20000)
                .fuelType("Petrol")
                .transmission("Automatic")
                .power(140)
                .carColor("Red")
                .engineCapacity(1.8)
                .build();

        Advertisement ad = Advertisement.builder()
                .title("Honda Civic")
                .location("Krakow")
                .user(user)
                .car(car)
                .build();

        advertisementRepository.save(ad);

        List<Advertisement> foundAds = advertisementRepository.findByUserUsername("aduser2");
        assertEquals(1, foundAds.size());
        assertEquals("Honda Civic", foundAds.get(0).getTitle());
    }
}
