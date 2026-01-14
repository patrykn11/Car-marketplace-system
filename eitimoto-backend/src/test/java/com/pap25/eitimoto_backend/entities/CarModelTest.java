package com.pap25.eitimoto_backend.entities;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class CarModelTest {

    @Test
    void builder_ShouldConstructValidCarModel() {
        Brand brand = Brand.builder().name("Audi").build();
        CarModel model = CarModel.builder()
                .id(1L)
                .name("A4")
                .photoUrl("http://photo.url")
                .productionYearStart(2010)
                .productionYearEnd(2016)
                .engineType("Diesel")
                .horsePower(150)
                .brand(brand)
                .build();

        assertNotNull(model);
        assertEquals("A4", model.getName());
        assertEquals(2010, model.getProductionYearStart());
        assertEquals("Audi", model.getBrand().getName());
    }
}
