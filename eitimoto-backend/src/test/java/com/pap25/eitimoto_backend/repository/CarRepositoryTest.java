package com.pap25.eitimoto_backend.repository;

import com.pap25.eitimoto_backend.TestContainersConfig;
import com.pap25.eitimoto_backend.entities.Car;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertTrue;

@DataJpaTest
@Import(TestContainersConfig.class)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
class CarRepositoryTest {

    @Autowired
    private CarRepository carRepository;

    @Test
    void findByCarId_ShouldReturnCar() {
        Car car = Car.builder()
                .carBrand("Mazda")
                .carModel("CX-5")
                .carBodyType("SUV")
                .productionYear(2022)
                .price(40000)
                .mileage(5000)
                .fuelType("Petrol")
                .transmission("Automatic")
                .power(190)
                .carColor("Red")
                .engineCapacity(2.5)
                .build();
        carRepository.save(car);

        Optional<Car> found = carRepository.findByCarId(car.getCarId());

        assertTrue(found.isPresent());
    }
}
