package com.pap25.eitimoto_backend.controllers;

import com.pap25.eitimoto_backend.dto.AdvertisementResponseDto;
import com.pap25.eitimoto_backend.services.FavoriteAdvertisementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@RequiredArgsConstructor
public class FavoriteAdvertisementController {

    private final FavoriteAdvertisementService favoriteAdvertisementService;

    @GetMapping
    public ResponseEntity<List<Long>> getFavoriteAdvertisements() {
        List<Long> favorites = favoriteAdvertisementService.getFavoriteAdvertisements();
        return ResponseEntity.ok(favorites);
    }

    @GetMapping("/list")
    public ResponseEntity<List<AdvertisementResponseDto>> getFavoriteAdvertisementsDetails() {
        List<AdvertisementResponseDto> favorites = favoriteAdvertisementService.getFavoriteAdvertisementsDetails();
        return ResponseEntity.ok(favorites);
    }

    @PostMapping("/{advertisementId}")
    public ResponseEntity<String> addFavoriteAdvertisement(@PathVariable Long advertisementId) {
        boolean added = favoriteAdvertisementService.addFavoriteAdvertisement(advertisementId);

        if (added) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Advertisement added to favorites.");
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Advertisement is already in favorites.");
        }
    }

    @DeleteMapping("/{advertisementId}")
    public ResponseEntity<String> removeFavoriteAdvertisement(@PathVariable Long advertisementId) {
        boolean removed = favoriteAdvertisementService.removeFavoriteAdvertisement(advertisementId);

        if (removed) {
            return ResponseEntity.ok("Advertisement removed from favorites.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Advertisement not found in favorites.");
        }
    }
}