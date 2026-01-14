package com.pap25.eitimoto_backend.controllers;

import com.pap25.eitimoto_backend.entities.Brand;
import com.pap25.eitimoto_backend.entities.CarModel;
import com.pap25.eitimoto_backend.repository.BrandRepository;
import com.pap25.eitimoto_backend.repository.CarModelRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityFilterAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;
import com.pap25.eitimoto_backend.services.JWTService;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = CatalogController.class,
    excludeAutoConfiguration = {
        SecurityAutoConfiguration.class,
        SecurityFilterAutoConfiguration.class
    })
@AutoConfigureMockMvc(addFilters = false)
class CatalogControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BrandRepository brandRepository;

    @MockBean
    private CarModelRepository carModelRepository;

    @MockBean
    private JWTService jwtService;

    @MockBean
    private UserDetailsService userDetailsService;

    @Test
    void getAllBrands_ShouldReturnListOfBrands() throws Exception {
        Brand brand = new Brand();
        brand.setName("Audi");
        given(brandRepository.findAll()).willReturn(List.of(brand));

        mockMvc.perform(get("/api/catalog/brands"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Audi"));
    }

    @Test
    void getModelsByBrand_ShouldReturnListOfModels() throws Exception {
        Long brandId = 1L;
        CarModel model = new CarModel();
        model.setName("A4");
        given(carModelRepository.findByBrandId(brandId)).willReturn(List.of(model));

        mockMvc.perform(get("/api/catalog/brands/{brandId}/models", brandId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("A4"));
    }

    @Test
    void getModelDetails_ShouldReturnModel_WhenExists() throws Exception {
        Long modelId = 1L;
        CarModel model = new CarModel();
        model.setName("A4");
        given(carModelRepository.findById(modelId)).willReturn(Optional.of(model));

        mockMvc.perform(get("/api/catalog/models/{modelId}", modelId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("A4"));
    }

    @Test
    void getModelDetails_ShouldReturnNotFound_WhenDoesNotExist() throws Exception {
        Long modelId = 1L;
        given(carModelRepository.findById(modelId)).willReturn(Optional.empty());

        mockMvc.perform(get("/api/catalog/models/{modelId}", modelId))
                .andExpect(status().isNotFound());
    }
}
