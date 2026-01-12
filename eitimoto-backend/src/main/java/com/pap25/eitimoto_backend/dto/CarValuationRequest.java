package com.pap25.eitimoto_backend.dto;

import lombok.Builder;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CarValuationRequest {
    private String brand;
    private String model;
    private Integer productionYear;
    private Integer mileage;
    private String fuelType;
}
