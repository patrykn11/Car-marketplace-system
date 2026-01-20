package com.pap25.eitimoto_backend.services;

import com.pap25.eitimoto_backend.dto.AdvertisementDto;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service responsible for generating text embeddings using an AI embedding model.
 * Provides methods to convert advertisements and search queries into vector representations
 * for semantic similarity search.
 */
@Service
@RequiredArgsConstructor
public class EmbeddingService {

    private final EmbeddingModel embeddingModel;

    /**
     * Generate an embedding vector for an advertisement based on its attributes.
     * Combines car brand, model, year, description, body type, and fuel type into a text representation.
     *
     * @param dto the advertisement DTO containing car data and description
     * @return a list of doubles representing the embedding vector
     */
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

    /**
     * Convert a text string into an embedding vector using the AI model.
     *
     * @param text the input text to embed
     * @return a list of doubles representing the embedding vector
     */
    public List<Double> embedText(String text) {
        return embeddingModel.embed(text);
    }

    /**
     * Generate an embedding vector for a search query based on user criteria.
     * Combines keywords, brand, model, and body type into a search-oriented text representation.
     *
     * @param keywords user-provided search keywords or requirements
     * @param brand optional car brand filter
     * @param model optional car model filter
     * @param bodyType optional car body type filter
     * @return a list of doubles representing the search embedding vector
     */
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