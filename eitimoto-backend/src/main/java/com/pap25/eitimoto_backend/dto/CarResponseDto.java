package com.pap25.eitimoto_backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CarResponseDto {
    private Long carId;
    private String carBrand;
    private String carModel;
    private Integer productionYear;
}