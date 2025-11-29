package com.pap25.eitimoto_backend.services;

import com.pap25.eitimoto_backend.dto.AdvertisementDto;
import com.pap25.eitimoto_backend.dto.AdvertisementResponseDto;
import com.pap25.eitimoto_backend.entities.Advertisement;
import com.pap25.eitimoto_backend.entities.User;
import com.pap25.eitimoto_backend.repository.AdvertisementRepository;
import com.pap25.eitimoto_backend.repository.CarRepository;
import com.pap25.eitimoto_backend.entities.Car;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.pap25.eitimoto_backend.services.UserContextService;
import java.util.List;
import java.util.stream.Collectors;

import jakarta.persistence.EntityNotFoundException;
import com.pap25.eitimoto_backend.mapper.AdvertisementMapper;


@Service
@RequiredArgsConstructor
public class AdvertisementService {
    private final AdvertisementRepository advertisementRepository;
    private final UserContextService userContextService;
    private final AdvertisementMapper advertisementMapper;
    private final CarRepository carRepository;

    public List<AdvertisementResponseDto> getAdvertisements() {
        return advertisementRepository.findAll()
                .stream()
                .map(advertisementMapper::toDto)
                .collect(Collectors.toList());
    }

    public Advertisement getAdvertisementById(Long id) {
        return advertisementRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Advertisement not found with id: " + id));
    }

    @Transactional
    public AdvertisementResponseDto addAdvertisement(AdvertisementDto adDto) {
        User user = userContextService.getCurrentUser();


        Car car = new Car();
        car.setCarBrand(adDto.getCar().getCarBrand());
        car.setCarModel(adDto.getCar().getCarModel());
        car.setProductionYear(adDto.getCar().getProductionYear());

        carRepository.save(car);
        Advertisement ad = Advertisement.builder()
                .title(adDto.getTitle())
                .description(adDto.getDescription())
                .user(user)
                .car(car).build();
        advertisementRepository.save(ad);
        return advertisementMapper.toDto(ad);
    }
}
