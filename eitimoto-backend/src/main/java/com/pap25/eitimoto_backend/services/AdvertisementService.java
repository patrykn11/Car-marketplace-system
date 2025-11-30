package com.pap25.eitimoto_backend.services;

import com.pap25.eitimoto_backend.dto.AdvertisementDto;
import com.pap25.eitimoto_backend.dto.AdvertisementResponseDto;
import com.pap25.eitimoto_backend.entities.Advertisement;
import com.pap25.eitimoto_backend.entities.User;
import com.pap25.eitimoto_backend.repository.AdvertisementRepository;
import com.pap25.eitimoto_backend.repository.CarRepository;
import com.pap25.eitimoto_backend.entities.Car;
import com.pap25.eitimoto_backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.pap25.eitimoto_backend.services.UserContextService;
import java.util.List;
import java.util.stream.Collectors;

import jakarta.persistence.EntityNotFoundException;
import com.pap25.eitimoto_backend.mapper.AdvertisementMapper;
import org.springframework.web.bind.annotation.PathVariable;


@Service
@RequiredArgsConstructor
public class AdvertisementService {
    private final AdvertisementRepository advertisementRepository;
    private final UserContextService userContextService;
    private final AdvertisementMapper advertisementMapper;
    private final CarRepository carRepository;
    private final UserRepository userRepository;

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
        car.setPrice(adDto.getCar().getPrice());
        car.setMileage(adDto.getCar().getMileage());

        carRepository.save(car);
        Advertisement ad = Advertisement.builder()
                .title(adDto.getTitle())
                .description(adDto.getDescription())
                .user(user)
                .car(car).build();
        advertisementRepository.save(ad);
        return advertisementMapper.toDto(ad);
    }


    @Transactional
    public AdvertisementResponseDto removeAdvertisement(Long id) {
        User currentUser = userContextService.getCurrentUser();
        Advertisement ad = advertisementRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Not found"));

        if(!currentUser.getId().equals(ad.getUser().getId())) {
            throw new SecurityException("You are not allowed to delete this advertisement");
        }
        advertisementRepository.delete(ad);

        return advertisementMapper.toDto(ad);

    }

    public List<AdvertisementResponseDto> getUserAdvertisement() {
        User currentUser = userContextService.getCurrentUser();

        List<Advertisement> ads = advertisementRepository.findByUserId(currentUser.getId());

        return ads.stream().map(ad -> advertisementMapper.toDto(ad)).collect(Collectors.toList());
    }
}
