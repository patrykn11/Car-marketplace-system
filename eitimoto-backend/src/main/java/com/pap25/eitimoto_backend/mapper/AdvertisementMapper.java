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
                .carBrand(ad.getCar().getCarBrand())
                .carModel(ad.getCar().getCarModel())
                .carBodyType(ad.getCar().getCarBodyType())
                .productionYear(ad.getCar().getProductionYear())
                .mileage(ad.getCar().getMileage())
                .price(ad.getCar().getPrice())
                .fuelType(ad.getCar().getFuelType())
                .transmission(ad.getCar().getTransmission())
                .power(ad.getCar().getPower())
                .carColor(ad.getCar().getCarColor())
                .engineCapacity(ad.getCar().getEngineCapacity())
                .build();

        return AdvertisementResponseDto.builder()
                .advertisementId(ad.getAdvertisementId())
                .title(ad.getTitle())
                .description(ad.getDescription())
                .location(ad.getLocation())
                .carData(carDto)
                .username(ad.getUser().getUsername())
                .viewCount(ad.getViewCount())
                .clickCount(ad.getClickCount())
                .contactNumber(ad.getUser().getContactNumber())
                .hasImage(ad.getImage() != null && ad.getImage().length > 0)
                .build();
    }
}