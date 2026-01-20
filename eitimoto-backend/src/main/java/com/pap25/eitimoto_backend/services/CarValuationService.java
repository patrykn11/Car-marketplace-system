package com.pap25.eitimoto_backend.services;

import org.springframework.stereotype.Service;
import com.pap25.eitimoto_backend.dto.CarValuationRequest;


/**
 * Service responsible for estimating vehicle prices.
 * Uses a simple algorithm based on base price, age, mileage,
 * and fuel type to calculate an approximate market value.
 */
@Service
public class CarValuationService {
   /**
    * Calculate the estimated price of a vehicle based on its attributes.
    * Takes into account production year, mileage, and fuel type.
    * Electric vehicles receive a premium, while diesel vehicles are discounted.
    *
    * @param request the valuation request containing vehicle details
    * @return the estimated price in the base currency (minimum 4000)
    */
   public double CalculateVehiclePrice(CarValuationRequest request) {
       double basePrice = 80000;
       double ageFactor = (2025 - request.getProductionYear()) * 4000;
       double mileageFactor = (request.getMileage() / 40000.0) * 2000;
       double estimatedPrice = basePrice - ageFactor - mileageFactor;
       if ("Electric".equalsIgnoreCase(request.getFuelType())) {
           estimatedPrice += 12000;
       } else if ("Diesel".equalsIgnoreCase(request.getFuelType())) {
           estimatedPrice -= 4000;
       }

       return Math.max(estimatedPrice, 4000);
   }
}
