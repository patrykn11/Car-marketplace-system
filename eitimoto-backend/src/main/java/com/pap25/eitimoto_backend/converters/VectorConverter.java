package com.pap25.eitimoto_backend.converters;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Converter
public class VectorConverter implements AttributeConverter<List<Double>, String> {
    @Override
    public String convertToDatabaseColumn(List<Double> attribute) {
        if (attribute == null) return null;
        return attribute.toString();
    }

    @Override
    public List<Double> convertToEntityAttribute(String dbData) {
        if (dbData == null) return null;
        String[] parts = dbData.replace("[", "").replace("]", "").split(",");
        return Arrays.stream(parts)
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .map(Double::valueOf)
                .collect(Collectors.toList());
    }
}
