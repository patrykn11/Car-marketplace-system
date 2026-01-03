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

    public float[] generateAdvertisementEmbedding(AdvertisementDto dto) {
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

    public float[] embedText(String text) {
        List<Double> embeddingList = embeddingModel.embed(text);

        float[] floatArray = new float[embeddingList.size()];
        for (int i = 0; i < embeddingList.size(); i++) {
            floatArray[i] = embeddingList.get(i).floatValue();
        }
        return floatArray;
    }

    public float[] generateSearchEmbedding(String keywords, String brand, String model, String bodyType) {
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