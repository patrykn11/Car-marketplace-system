package com.pap25.eitimoto_backend.controllers;

import java.lang.foreign.Linker.Option;

import org.apache.catalina.connector.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.pap25.eitimoto_backend.entities.Advertisement;
import com.pap25.eitimoto_backend.repository.AdvertisementRepository;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/advertisements")
@RequiredArgsConstructor
public class AdvertisementController {

    private final AdvertisementRepository advertisementRepository;

    @GetMapping("/{id}")
    public ResponseEntity<Advertisement> getAdvertisement(@PathVariable("id") Long advertisementId) {
        return advertisementRepository.findByAdvertisementID(advertisementId)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add-car")
    public ResponseEntity<Advertisement> addCar(@RequestBody Advertisement request) {
        /* --- Saving new car in repository */
        Advertisement saved = advertisementRepository.save(request);

        return ResponseEntity
               .status(HttpStatus.CREATED)
               .body(saved); 
    }
}
