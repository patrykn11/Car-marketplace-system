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

    public AdvertisementResponseDto getAdvertisementDtoById(Long id) {
        Advertisement ad = getAdvertisementById(id);
        return advertisementMapper.toDto(ad);
    }

    @Transactional
    public AdvertisementResponseDto addAdvertisement(AdvertisementDto adDto) {
        User user = userContextService.getCurrentUser();

        Car car = new Car();
        car.setCarBrand(adDto.getCarData().getCarBrand());
        car.setCarModel(adDto.getCarData().getCarModel());
        car.setProductionYear(adDto.getCarData().getProductionYear());
        car.setPrice(adDto.getCarData().getPrice());
        car.setMileage(adDto.getCarData().getMileage());
        car.setFuelType(adDto.getCarData().getFuelType());
        car.setTransmission(adDto.getCarData().getTransmission());
        car.setPower(adDto.getCarData().getPower());
        car.setCarColor(adDto.getCarData().getCarColor());
        car.setEngineCapacity(adDto.getCarData().getEngineCapacity());

        carRepository.save(car);
        Advertisement ad = Advertisement.builder()
                .title(adDto.getTitle())
                .description(adDto.getDescription())
                .location(adDto.getLocation())
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

        AdvertisementResponseDto responseDto = advertisementMapper.toDto(ad);
        advertisementRepository.delete(ad);

        return responseDto;
    }

    @Transactional
    public AdvertisementResponseDto updateAdvertisement(Long id, AdvertisementDto adDto) {
        User currentUser = userContextService.getCurrentUser();
        Advertisement ad = advertisementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));

        if (!currentUser.getId().equals(ad.getUser().getId())) {
            throw new SecurityException("You are not allowed to update this advertisement");
        }

        // Update Advertisement fields
        ad.setTitle(adDto.getTitle());
        ad.setDescription(adDto.getDescription());
        ad.setLocation(adDto.getLocation());

        // Update Car fields
        Car car = ad.getCar();
        car.setCarBrand(adDto.getCarData().getCarBrand());
        car.setCarModel(adDto.getCarData().getCarModel());
        car.setProductionYear(adDto.getCarData().getProductionYear());
        car.setPrice(adDto.getCarData().getPrice());
        car.setMileage(adDto.getCarData().getMileage());
        car.setFuelType(adDto.getCarData().getFuelType());
        car.setTransmission(adDto.getCarData().getTransmission());
        car.setPower(adDto.getCarData().getPower());
        car.setCarColor(adDto.getCarData().getCarColor());
        car.setEngineCapacity(adDto.getCarData().getEngineCapacity());

        // Save changes (cascaded to Car)
        advertisementRepository.save(ad);

        return advertisementMapper.toDto(ad);
    }

    public List<AdvertisementResponseDto> getUserAdvertisement() {
        User currentUser = userContextService.getCurrentUser();

        List<Advertisement> ads = advertisementRepository.findByUserId(currentUser.getId());

        return ads.stream().map(ad -> advertisementMapper.toDto(ad)).collect(Collectors.toList());
    }
}
