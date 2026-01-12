package com.pap25.eitimoto_backend.controllers;

import com.pap25.eitimoto_backend.dto.UserStatsDto;
import com.pap25.eitimoto_backend.services.AdvertisementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class StatsController {

    private final AdvertisementService advertisementService;

    @PostMapping("/advertisements/{id}/view")
    public ResponseEntity<Void> incrementViewCount(@PathVariable Long id) {
        advertisementService.incrementViewCount(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/advertisements/{id}/contact")
    public ResponseEntity<Void> incrementContactCount(@PathVariable Long id) {
        advertisementService.incrementContactCount(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/advertisements/{id}/like")
    public ResponseEntity<Void> incrementLikeCount(@PathVariable Long id) {
        advertisementService.incrementLikeCount(id);
        return ResponseEntity.ok().build();
    }



    @GetMapping("/profile/stats")
    public ResponseEntity<UserStatsDto> getUserStats() {
        return ResponseEntity.ok(advertisementService.getUserStats());
    }
}
