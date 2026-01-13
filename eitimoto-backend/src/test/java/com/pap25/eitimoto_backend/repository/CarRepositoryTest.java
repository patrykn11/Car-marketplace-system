package com.pap25.eitimoto_backend.repository;

import com.pap25.eitimoto_backend.entities.Car;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Import(com.pap25.eitimoto_backend.TestContainersConfig.class)
@Transactional
class CarRepositoryTest {

    @Autowired
    private CarRepository carRepository;

    @Test
    void testSaveAndFindCar() {
        Car car = Car.builder()
                .carBrand("Ford")
                .carModel("Focus")
                .carBodyType("Hatchback")
                .productionYear(2015)
                .price(30000)
                .mileage(50000)
                .fuelType("Diesel")
                .transmission("Manual")
                .power(120)
                .carColor("Blue")
                .engineCapacity(2.0)
                .build();

        Car savedCar = carRepository.save(car);

        assertNotNull(savedCar.getCarId());
        assertEquals("Ford", savedCar.getCarBrand());

        Optional<Car> foundCar = carRepository.findByCarId(savedCar.getCarId());
        assertTrue(foundCar.isPresent());
        assertEquals("Focus", foundCar.get().getCarModel());

        boolean exists = carRepository.existsByCarId(savedCar.getCarId());
        assertTrue(exists);
    }
}
