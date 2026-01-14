package com.pap25.eitimoto_backend.entities;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class BrandTest {

    @Test
    void builder_ShouldConstructValidBrand() {
        Brand brand = Brand.builder()
                .id(1L)
                .name("Tesla")
                .logoUrl("http://logo.url")
                .build();

        assertNotNull(brand);
        assertEquals(1L, brand.getId());
        assertEquals("Tesla", brand.getName());
        assertEquals("http://logo.url", brand.getLogoUrl());
    }
}
