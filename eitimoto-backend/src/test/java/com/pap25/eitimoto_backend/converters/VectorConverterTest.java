package com.pap25.eitimoto_backend.converters;

import org.junit.jupiter.api.Test;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class VectorConverterTest {

    private final VectorConverter converter = new VectorConverter();

    @Test
    void convertToDatabaseColumn_ShouldReturnStringRepresentation() {
        List<Double> vector = List.of(1.1, 2.2, 3.3);
        String result = converter.convertToDatabaseColumn(vector);
        assertEquals("[1.1, 2.2, 3.3]", result);
    }

    @Test
    void convertToDatabaseColumn_ShouldReturnNull_WhenAttributeIsNull() {
        assertNull(converter.convertToDatabaseColumn(null));
    }

    @Test
    void convertToEntityAttribute_ShouldReturnList() {
        String dbData = "[1.1, 2.2, 3.3]";
        List<Double> result = converter.convertToEntityAttribute(dbData);
        assertEquals(3, result.size());
        assertEquals(1.1, result.get(0));
        assertEquals(2.2, result.get(1));
        assertEquals(3.3, result.get(2));
    }

    @Test
    void convertToEntityAttribute_ShouldReturnNull_WhenDbDataIsNull() {
        assertNull(converter.convertToEntityAttribute(null));
    }

    @Test
    void convertToEntityAttribute_ShouldHandleEmptyVector() {
        String dbData = "[]";
        List<Double> result = converter.convertToEntityAttribute(dbData);
        assertTrue(result.isEmpty());
    }
}
