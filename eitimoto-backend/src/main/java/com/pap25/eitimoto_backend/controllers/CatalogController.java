package com.pap25.eitimoto_backend.controllers;

import com.pap25.eitimoto_backend.entities.Brand;
import com.pap25.eitimoto_backend.entities.CarModel;
import com.pap25.eitimoto_backend.repository.BrandRepository;
import com.pap25.eitimoto_backend.repository.CarModelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/catalog")
@RequiredArgsConstructor
public class CatalogController {

    private final BrandRepository brandRepository;
    private final CarModelRepository carModelRepository;

    @GetMapping("/brands")
    public ResponseEntity<List<Brand>> getAllBrands() {
        return ResponseEntity.ok(brandRepository.findAll());
    }

    @GetMapping("/brands/{brandId}/models")
    public ResponseEntity<List<CarModel>> getModelsByBrand(@PathVariable Long brandId) {
        return ResponseEntity.ok(carModelRepository.findByBrandId(brandId));
    }
    
    @GetMapping("/models/{modelId}")
    public ResponseEntity<CarModel> getModelDetails(@PathVariable Long modelId) {
        return carModelRepository.findById(modelId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}