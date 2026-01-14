package com.pap25.eitimoto_backend.services;

import com.pap25.eitimoto_backend.dto.AdvertisementDto;
import com.pap25.eitimoto_backend.dto.CarDto;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.ai.embedding.EmbeddingModel;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class EmbeddingServiceTest {

    @Mock
    private EmbeddingModel embeddingModel;

    @InjectMocks
    private EmbeddingService embeddingService;

    @Test
    void shouldGenerateAdvertisementEmbedding() {
        // Arrange
        AdvertisementDto dto = new AdvertisementDto();
        CarDto carData = new CarDto();
        carData.setCarBrand("Toyota");
        carData.setCarModel("Corolla");
        carData.setProductionYear(2020);
        carData.setCarBodyType("Sedan");
        carData.setFuelType("Hybrid");
        dto.setCarData(carData);
        dto.setDescription("Great car");

        List<Double> expectedEmbedding = List.of(0.1, 0.2, 0.3);
        when(embeddingModel.embed(anyString())).thenReturn(expectedEmbedding);

        // Act
        List<Double> result = embeddingService.generateAdvertisementEmbedding(dto);

        // Assert
        assertEquals(expectedEmbedding, result);
        verify(embeddingModel).embed(anyString());
    }

    @Test
    void shouldEmbedText() {
        // Arrange
        String text = "test text";
        List<Double> expectedEmbedding = List.of(0.5, 0.6);
        when(embeddingModel.embed(text)).thenReturn(expectedEmbedding);

        // Act
        List<Double> result = embeddingService.embedText(text);

        // Assert
        assertEquals(expectedEmbedding, result);
        verify(embeddingModel).embed(text);
    }

    @Test
    void shouldGenerateSearchEmbedding() {
        // Arrange
        String keywords = "cheap reliable";
        String brand = "Honda";
        String model = "Civic";
        String bodyType = "Hatchback";

        List<Double> expectedEmbedding = List.of(0.9, 0.8);
        when(embeddingModel.embed(anyString())).thenReturn(expectedEmbedding);

        // Act
        List<Double> result = embeddingService.generateSearchEmbedding(keywords, brand, model, bodyType);

        // Assert
        assertEquals(expectedEmbedding, result);
        verify(embeddingModel).embed(anyString());
    }
}
