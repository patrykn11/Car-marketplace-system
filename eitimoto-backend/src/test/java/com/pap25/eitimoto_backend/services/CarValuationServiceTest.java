package com.pap25.eitimoto_backend.services;

import com.pap25.eitimoto_backend.dto.CarValuationRequest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
class CarValuationServiceTest {

    @InjectMocks
    private CarValuationService carValuationService;

    @Test
    void shouldCalculatePriceForStandardVehicle() {
        // Base price: 80000
        // Age factor: (2025 - 2020) * 4000 = 5 * 4000 = 20000
        // Mileage factor: (40000 / 40000) * 2000 = 1 * 2000 = 2000
        // Estimated: 80000 - 20000 - 2000 = 58000

        CarValuationRequest request = new CarValuationRequest();
        request.setProductionYear(2020);
        request.setMileage(40000);
        request.setFuelType("Petrol");

        double price = carValuationService.CalculateVehiclePrice(request);

        assertEquals(58000, price);
    }

    @Test
    void shouldCalculatePriceForElectricVehicle() {
        // Base: 80000
        // Age: (2025 - 2024) * 4000 = 4000
        // Mileage: (20000 / 40000) * 2000 = 0.5 * 2000 = 1000
        // Base estimated: 80000 - 4000 - 1000 = 75000
        // Electric bonus: +12000
        // Total: 87000

        CarValuationRequest request = new CarValuationRequest();
        request.setProductionYear(2024);
        request.setMileage(20000);
        request.setFuelType("Electric");

        double price = carValuationService.CalculateVehiclePrice(request);

        assertEquals(87000, price);
    }

    @Test
    void shouldCalculatePriceForDieselVehicle() {
        // Base: 80000
        // Age: (2025 - 2015) * 4000 = 40000
        // Mileage: (100000 / 40000) * 2000 = 2.5 * 2000 = 5000
        // Base estimated: 80000 - 40000 - 5000 = 35000
        // Diesel penalty: -4000
        // Total: 31000

        CarValuationRequest request = new CarValuationRequest();
        request.setProductionYear(2015);
        request.setMileage(100000);
        request.setFuelType("Diesel");

        double price = carValuationService.CalculateVehiclePrice(request);

        assertEquals(31000, price);
    }

    @Test
    void shouldReturnMinimumPriceWhenCalculationGoesBelowZero() {
        // Very old and high mileage
        CarValuationRequest request = new CarValuationRequest();
        request.setProductionYear(1990); // (2025-1990)*4000 = 35*4000 = 140000
        request.setMileage(500000);
        request.setFuelType("Petrol");

        // 80000 - 140000 - ... < 0

        double price = carValuationService.CalculateVehiclePrice(request);

        assertEquals(4000, price);
    }
}
