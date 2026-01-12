package com.pap25.eitimoto_backend.services;

import org.springframework.stereotype.Service;
import com.pap25.eitimoto_backend.dto.CarValuationRequest;


@Service
public class CarValuationService {
   public double CalculateVehiclePrice(CarValuationRequest request) {
       double basePrice = 80000;
       double ageFactor = (2025 - request.getProductionYear()) * 4000;
       double mileageFactor = (request.getMileage() / 40000) * 2000;
       double estimatedPrice = basePrice - ageFactor - mileageFactor;
       if ("Electric".equalsIgnoreCase(request.getFuelType())) {
           estimatedPrice += 12000;
       } else if ("Diesel".equalsIgnoreCase(request.getFuelType())) {
           estimatedPrice -= 4000;
       }

       return Math.max(estimatedPrice, 4000);
   }
}
