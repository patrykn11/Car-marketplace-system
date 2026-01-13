package com.pap25.eitimoto_backend.controllers;

import com.pap25.eitimoto_backend.TestContainersConfig;
import com.pap25.eitimoto_backend.entities.Brand;
import com.pap25.eitimoto_backend.entities.CarModel;
import com.pap25.eitimoto_backend.repository.BrandRepository;
import com.pap25.eitimoto_backend.repository.CarModelRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@Import(TestContainersConfig.class)
@AutoConfigureMockMvc
@Transactional
class CatalogControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private CarModelRepository carModelRepository;

    @BeforeEach
    void setUp() {
        carModelRepository.deleteAll();
        brandRepository.deleteAll();
    }

    @Test
    void getAllBrands_ShouldReturnListOfBrands() throws Exception {
        Brand brand = Brand.builder().name("TestBrand").logoUrl("url").build();
        brandRepository.save(brand);

        mockMvc.perform(get("/api/catalog/brands")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].name", is("TestBrand")));
    }

    @Test
    void getModelsByBrand_ShouldReturnModels() throws Exception {
        Brand brand = Brand.builder().name("TestBrand").logoUrl("url").build();
        brandRepository.save(brand);

        CarModel model = CarModel.builder()
                .name("TestModel")
                .brand(brand)
                .photoUrl("url")
                .horsePower(100)
                .build();
        carModelRepository.save(model);

        mockMvc.perform(get("/api/catalog/brands/{brandId}/models", brand.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].name", is("TestModel")));
    }
}
