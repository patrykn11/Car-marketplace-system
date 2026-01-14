package com.pap25.eitimoto_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdvertisementDto {
    private String title;
    private String description;
    private String location;
    private CarDto carData;
    private Long viewCount;
    private Long contactCount;
    private Long likeCount;

}