package com.pap25.eitimoto_backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdvertisementDto {
    private String title;
    private String description;
    private String location;
    private CarDto carData; // pełne dane samochodu
    private Long viewCount;
    private Long clickCount;
}