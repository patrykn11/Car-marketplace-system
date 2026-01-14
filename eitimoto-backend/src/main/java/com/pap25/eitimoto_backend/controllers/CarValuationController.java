package com.pap25.eitimoto_backend.controllers;

import com.pap25.eitimoto_backend.dto.CarValuationRequest;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.pap25.eitimoto_backend.services.CarValuationService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/valuation")
public class CarValuationController {
    private final CarValuationService carValuationService;
    @PostMapping("/calculate")
    public ResponseEntity<Double> calculateCarValuation(@RequestBody CarValuationRequest request) {
        Double estimatedPrice = carValuationService.CalculateVehiclePrice(request);
        return ResponseEntity.ok(estimatedPrice);

    }
}
