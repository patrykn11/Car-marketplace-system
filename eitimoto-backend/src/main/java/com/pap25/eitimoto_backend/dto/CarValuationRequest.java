package com.pap25.eitimoto_backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CarValuationRequest {
    private String brand;
    private String model;
    private Integer productionYear;
    private Integer mileage;
    private String fuelType;
}
