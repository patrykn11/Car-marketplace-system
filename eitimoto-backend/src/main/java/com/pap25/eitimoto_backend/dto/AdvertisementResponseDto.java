package com.pap25.eitimoto_backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdvertisementResponseDto {
    private Long advertisementId;
    private String title;
    private String description;
    private String location;
    private CarDto carData;
    private String username;
    private Long viewCount;
    private Long clickCount;
    private String contactNumber;
    private long likesCount;
}