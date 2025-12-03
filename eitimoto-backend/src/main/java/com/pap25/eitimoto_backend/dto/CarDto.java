package com.pap25.eitimoto_backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CarDto {
    // To nie potrzebne bo Encja Car zajmuje sie przypisaniem Id w bazie a nie Dto
    // private Long carId;

    private String carBrand;
    private String carModel;
    private Integer productionYear;
    private Integer price;
    private Integer mileage;
    private String fuelType;
    private String transmission;
    private Integer power;
    private String carColor;
    private Double engineCapacity;
}