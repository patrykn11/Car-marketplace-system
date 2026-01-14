package com.pap25.eitimoto_backend.controllers;

import com.pap25.eitimoto_backend.services.AdService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/Ad")
public class AdController {
    private final AdService adService;

    @GetMapping
    public ResponseEntity<String> getFavBrand() {
        return ResponseEntity.ok(adService.favoriteCar());

    }
}
