package com.pap25.eitimoto_backend.mapper;

import com.pap25.eitimoto_backend.dto.AdvertisementDto;
import org.springframework.stereotype.Component;
import com.pap25.eitimoto_backend.dto.AdvertisementResponseDto;
import com.pap25.eitimoto_backend.dto.CarDto;
import com.pap25.eitimoto_backend.entities.Advertisement;

@Component
public class AdvertisementMapper {

    public AdvertisementResponseDto toDto(Advertisement ad) {
        CarDto carDto = CarDto.builder()
                .carId(ad.getCar().getCarId())
                .carBrand(ad.getCar().getCarBrand())
                .carModel(ad.getCar().getCarModel())
                .productionYear(ad.getCar().getProductionYear())
                .mileage(ad.getCar().getMileage())
                .price(ad.getCar().getPrice())
                .build();

        return AdvertisementResponseDto.builder()
                .advertisementId(ad.getAdvertisementId())
                .title(ad.getTitle())
                .description(ad.getDescription())
                .car(carDto)
                .username(ad.getUser().getUsername())
                .build();
    }
}