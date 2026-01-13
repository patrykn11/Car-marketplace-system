package com.pap25.eitimoto_backend.repository;

import com.pap25.eitimoto_backend.entities.Brand;
import com.pap25.eitimoto_backend.entities.CarModel;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Import(com.pap25.eitimoto_backend.TestContainersConfig.class)
@Transactional
class CarModelRepositoryTest {

    @Autowired
    private CarModelRepository carModelRepository;

    @Autowired
    private BrandRepository brandRepository;

    @Test
    void testSaveAndFindCarModelByBrand() {
        Brand brand = Brand.builder()
                .name("TestBMW")
                .logoUrl("http://example.com/bmw.png")
                .build();
        brandRepository.save(brand);

        CarModel model1 = CarModel.builder()
                .name("X5")
                .brand(brand)
                .productionYearStart(2018)
                .productionYearEnd(2022)
                .build();

        CarModel model2 = CarModel.builder()
                .name("M3")
                .brand(brand)
                .productionYearStart(2020)
                .build();

        carModelRepository.save(model1);
        carModelRepository.save(model2);

        List<CarModel> models = carModelRepository.findByBrandId(brand.getId());
        assertEquals(2, models.size());
        assertTrue(models.stream().anyMatch(m -> m.getName().equals("X5")));
        assertTrue(models.stream().anyMatch(m -> m.getName().equals("M3")));
    }
}
