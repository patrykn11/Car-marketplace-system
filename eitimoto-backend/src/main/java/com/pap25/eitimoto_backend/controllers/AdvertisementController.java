package com.pap25.eitimoto_backend.controllers;

import com.pap25.eitimoto_backend.dto.AdvertisementDto;
import com.pap25.eitimoto_backend.dto.AdvertisementResponseDto;
import com.pap25.eitimoto_backend.entities.Advertisement;
import org.apache.catalina.connector.Response;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.pap25.eitimoto_backend.services.AdvertisementService;
import com.pap25.eitimoto_backend.repository.AdvertisementRepository;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost")
@RequestMapping("/api/advertisements")
public class AdvertisementController {

    private final AdvertisementService advertisementService;

    @GetMapping
    public ResponseEntity<List<AdvertisementResponseDto>> getAllAdvertisements() {
        List<AdvertisementResponseDto> list = advertisementService.getAdvertisements();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/user")
    public ResponseEntity<List<AdvertisementResponseDto>> getUserAdvertisements() {
        List<AdvertisementResponseDto> ads = advertisementService.getUserAdvertisement();
        return ResponseEntity.ok(ads);
    }

    @PostMapping("/add")
    public ResponseEntity<AdvertisementResponseDto> addAdvertisements(@RequestBody AdvertisementDto advertisement) {
        AdvertisementResponseDto saveAd =  advertisementService.addAdvertisement(advertisement);
        return ResponseEntity.ok(saveAd);
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<AdvertisementResponseDto> removeAdvertisements(@PathVariable Long id) {
        AdvertisementResponseDto removeAd =  advertisementService.removeAdvertisement(id);
        return ResponseEntity.ok(removeAd);
    }
}
