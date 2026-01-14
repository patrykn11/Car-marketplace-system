package com.pap25.eitimoto_backend.entities;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class CarTest {

    @Test
    void builder_ShouldConstructValidCar() {
        Car car = Car.builder()
                .carBrand("Toyota")
                .carModel("Corolla")
                .carBodyType("Sedan")
                .productionYear(2021)
                .price(25000)
                .mileage(15000)
                .fuelType("Hybrid")
                .transmission("CVT")
                .power(120)
                .carColor("White")
                .engineCapacity(1.8)
                .build();

        assertNotNull(car);
        assertEquals("Toyota", car.getCarBrand());
        assertEquals("Corolla", car.getCarModel());
        assertEquals(2021, car.getProductionYear());
        assertEquals(1.8, car.getEngineCapacity());
    }

    @Test
    void allArgsConstructor_ShouldWork() {
        Car car = new Car(1L, "Ford", "Focus", "Hatchback", 2015, 12000, 100000, "Petrol", "Manual", 100, "Blue", 1.6);
        assertEquals("Ford", car.getCarBrand());
        assertEquals(1L, car.getCarId());
    }
}
