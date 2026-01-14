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

        CarValuationRequest request = new CarValuationRequest();
        request.setProductionYear(2020);
        request.setMileage(40000);
        request.setFuelType("Petrol");

        double price = carValuationService.CalculateVehiclePrice(request);

        assertEquals(58000, price);
    }

    @Test
    void shouldCalculatePriceForElectricVehicle() {

        CarValuationRequest request = new CarValuationRequest();
        request.setProductionYear(2024);
        request.setMileage(20000);
        request.setFuelType("Electric");

        double price = carValuationService.CalculateVehiclePrice(request);

        assertEquals(87000, price);
    }

    @Test
    void shouldCalculatePriceForDieselVehicle() {

        CarValuationRequest request = new CarValuationRequest();
        request.setProductionYear(2015);
        request.setMileage(100000);
        request.setFuelType("Diesel");

        double price = carValuationService.CalculateVehiclePrice(request);

        assertEquals(31000, price);
    }

    @Test
    void shouldReturnMinimumPriceWhenCalculationGoesBelowZero() {
        CarValuationRequest request = new CarValuationRequest();
        request.setProductionYear(1990); // (2025-1990)*4000 = 35*4000 = 140000
        request.setMileage(500000);
        request.setFuelType("Petrol");


        double price = carValuationService.CalculateVehiclePrice(request);

        assertEquals(4000, price);
    }
}
