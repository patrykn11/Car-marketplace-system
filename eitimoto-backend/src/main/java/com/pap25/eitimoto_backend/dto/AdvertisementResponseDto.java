package com.pap25.eitimoto_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
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
    private boolean hasImage;
}