package com.pap25.eitimoto_backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CarDto {
    private String carBrand;
    private String carModel;
    
    @JsonProperty("carBodyType")
    private String carBodyType;

    private Integer productionYear;
    private Integer price;
    private Integer mileage;
    private String fuelType;
    private String transmission;
    private Integer power;
    private String carColor;
    private Double engineCapacity;
}