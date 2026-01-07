package com.pap25.eitimoto_backend.controllers;

import com.pap25.eitimoto_backend.dto.AdvertisementDto;
import com.pap25.eitimoto_backend.dto.AdvertisementResponseDto;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.pap25.eitimoto_backend.services.AdvertisementService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/advertisements")
public class AdvertisementController {

    private final AdvertisementService advertisementService;

    @GetMapping
    public ResponseEntity<List<AdvertisementResponseDto>> getAllAdvertisements() {
        List<AdvertisementResponseDto> list = advertisementService.getAdvertisements();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdvertisementResponseDto> getAdvertisementById(@PathVariable Long id) {
        AdvertisementResponseDto ad = advertisementService.getAdvertisementDtoById(id);
        return ResponseEntity.ok(ad);
    }

    @GetMapping("/{id}/image")
    public ResponseEntity<byte[]> getAdvertisementImage(@PathVariable Long id) {
        byte[] image = advertisementService.getAdvertisementImage(id);
        if (image != null) {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG);
            return ResponseEntity.ok().headers(headers).body(image);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/user")
    public ResponseEntity<List<AdvertisementResponseDto>> getUserAdvertisements() {
        List<AdvertisementResponseDto> ads = advertisementService.getUserAdvertisement();
        return ResponseEntity.ok(ads);
    }

    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<AdvertisementResponseDto> addAdvertisements(
            @RequestPart("advertisement") AdvertisementDto advertisement,
            @RequestPart("imageFile") MultipartFile imageFile) throws IOException {
        AdvertisementResponseDto saveAd =  advertisementService.addAdvertisement(advertisement, imageFile);
        return ResponseEntity.ok(saveAd);
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<AdvertisementResponseDto> removeAdvertisements(@PathVariable Long id) {
        AdvertisementResponseDto removeAd =  advertisementService.removeAdvertisement(id);
        return ResponseEntity.ok(removeAd);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<AdvertisementResponseDto> updateAdvertisement(@PathVariable Long id, @RequestBody AdvertisementDto advertisement) {
        AdvertisementResponseDto updatedAd = advertisementService.updateAdvertisement(id, advertisement);
        return ResponseEntity.ok(updatedAd);
    }

    @GetMapping("/popular")
    public ResponseEntity<List<AdvertisementResponseDto>> getPopularAdvertisements() {
        List<AdvertisementResponseDto> popularAds = advertisementService.getTopPopularAdvertisements(3);
        return ResponseEntity.ok(popularAds);
    }

    @GetMapping("/recommendations")
    public ResponseEntity<List<AdvertisementResponseDto>> getRecommendations() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        if ("anonymousUser".equals(username)) {
            return ResponseEntity.ok(List.of());
        }
        List<AdvertisementResponseDto> recommendations = advertisementService.getPersonalizedRecommendations(username);
        return ResponseEntity.ok(recommendations);
    }

    @GetMapping("/search")
    public ResponseEntity<List<AdvertisementResponseDto>> searchAdvertisements(
            @RequestParam(required = false) String keywords,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) String model,
            @RequestParam(required = false) String bodyType,
            @RequestParam(required = false) Integer minPrice,
            @RequestParam(required = false) Integer maxPrice,
            @RequestParam(required = false) Integer minYear,
            @RequestParam(required = false) Integer maxYear,
            @RequestParam(required = false) String fuelType,
            @RequestParam(required = false) String transmission,
            @RequestParam(required = false) Integer minMileage,
            @RequestParam(required = false) Integer maxMileage
    ) {
        List<AdvertisementResponseDto> results = advertisementService.searchAds(
                keywords, brand, model, bodyType, minPrice, maxPrice,
                minYear, maxYear, fuelType, transmission, minMileage, maxMileage
        );
        return ResponseEntity.ok(results);
    }
}
