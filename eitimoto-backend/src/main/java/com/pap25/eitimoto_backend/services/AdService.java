package com.pap25.eitimoto_backend.services;


import com.pap25.eitimoto_backend.entities.Advertisement;
import com.pap25.eitimoto_backend.entities.FavoriteAdvertisement;
import com.pap25.eitimoto_backend.entities.User;
import com.pap25.eitimoto_backend.repository.AdvertisementRepository;
import com.pap25.eitimoto_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AdService {
    private final AdvertisementRepository advertisementRepository;
    private final UserContextService userContextService;
    public String favoriteCar() {
        User user = userContextService.getCurrentUser();
        List<FavoriteAdvertisement> likes = user.getFavoriteAdvertisements();
        Map<String, Integer> cars = new HashMap<>();
        Integer max = 0;
        String favBrand=null;
        for(FavoriteAdvertisement fav : likes) {
            Advertisement advertisement = advertisementRepository.findById(fav.getAdvertisementId()).get();
            String brand = advertisement.getCar().getCarBrand();
            cars.put(brand, cars.getOrDefault(brand, 0) + 1);
            if(cars.get(brand) > max) {
                max = cars.get(brand);
                favBrand = brand;
            }
        }
        return favBrand != null ? favBrand : "Unknown";


    }
}
