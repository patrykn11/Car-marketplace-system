package com.pap25.eitimoto_backend.repository;

import com.pap25.eitimoto_backend.TestContainersConfig;
import com.pap25.eitimoto_backend.entities.Advertisement;
import com.pap25.eitimoto_backend.entities.Car;
import com.pap25.eitimoto_backend.entities.FavoriteAdvertisement;
import com.pap25.eitimoto_backend.entities.Role;
import com.pap25.eitimoto_backend.entities.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@DataJpaTest
@Import(TestContainersConfig.class)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
class FavoriteAdvertisementRepositoryTest {

    @Autowired
    private FavoriteAdvertisementRepository favoriteAdvertisementRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AdvertisementRepository advertisementRepository;

    @Test
    void findByUserId_ShouldReturnFavorites() {
        User user = User.builder().username("fuser").password("p").email("f@e.com").contactNumber("1").location("l").role(Role.USER).build();
        userRepository.save(user);

        Car car = Car.builder().carBrand("B").carModel("M").carBodyType("BT").productionYear(2020).price(1).mileage(1).fuelType("F").transmission("T").power(1).carColor("C").engineCapacity(1.0).build();
        Advertisement ad = Advertisement.builder().title("F").description("D").location("L").car(car).user(user).build();
        advertisementRepository.save(ad);

        FavoriteAdvertisement fav = new FavoriteAdvertisement();
        fav.setUser(user);
        fav.setAdvertisementId(ad.getAdvertisementId());
        favoriteAdvertisementRepository.save(fav);

        List<FavoriteAdvertisement> result = favoriteAdvertisementRepository.findByUserId(user.getId());

        assertEquals(1, result.size());
    }

    @Test
    void deleteByUserIdAndAdvertisementId_ShouldDelete() {
        User user = User.builder().username("duser").password("p").email("d@e.com").contactNumber("1").location("l").role(Role.USER).build();
        userRepository.save(user);

        Car car = Car.builder().carBrand("B").carModel("M").carBodyType("BT").productionYear(2020).price(1).mileage(1).fuelType("F").transmission("T").power(1).carColor("C").engineCapacity(1.0).build();
        Advertisement ad = Advertisement.builder().title("F").description("D").location("L").car(car).user(user).build();
        advertisementRepository.save(ad);

        FavoriteAdvertisement fav = new FavoriteAdvertisement();
        fav.setUser(user);
        fav.setAdvertisementId(ad.getAdvertisementId());
        favoriteAdvertisementRepository.save(fav);

        favoriteAdvertisementRepository.deleteByUserIdAndAdvertisementId(user.getId(), ad.getAdvertisementId());

        Optional<FavoriteAdvertisement> found = favoriteAdvertisementRepository.findByUserIdAndAdvertisementId(user.getId(), ad.getAdvertisementId());
        assertTrue(found.isEmpty());
    }
}
