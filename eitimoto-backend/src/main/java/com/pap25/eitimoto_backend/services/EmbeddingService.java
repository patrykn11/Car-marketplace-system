package com.pap25.eitimoto_backend.services;

import com.pap25.eitimoto_backend.dto.AdvertisementDto;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmbeddingService {

    private final EmbeddingModel embeddingModel;

    public List<Double> generateAdvertisementEmbedding(AdvertisementDto dto) {
        String text = String.format(
                "Car: %s %s, Year: %d, Description: %s, Body: %s, Fuel: %s",
                dto.getCarData().getCarBrand(),
                dto.getCarData().getCarModel(),
                dto.getCarData().getProductionYear(),
                dto.getDescription(),
                dto.getCarData().getCarBodyType(),
                dto.getCarData().getFuelType()
        );

        return embedText(text);
    }

    public List<Double> embedText(String text) {
        return embeddingModel.embed(text);
    }

    public List<Double> generateSearchEmbedding(String keywords, String brand, String model, String bodyType) {
        String queryText = String.format(
                "Looking for car: %s %s %s. User requirements: %s",
                brand != null ? brand : "",
                model != null ? model : "",
                bodyType != null ? bodyType : "",
                keywords
        );

        return embedText(queryText);
    }
}