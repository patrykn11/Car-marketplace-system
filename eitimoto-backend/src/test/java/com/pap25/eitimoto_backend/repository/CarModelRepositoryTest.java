package com.pap25.eitimoto_backend.repository;

import com.pap25.eitimoto_backend.TestContainersConfig;
import com.pap25.eitimoto_backend.entities.Brand;
import com.pap25.eitimoto_backend.entities.CarModel;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
@Import(TestContainersConfig.class)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
class CarModelRepositoryTest {

    @Autowired
    private CarModelRepository carModelRepository;

    @Autowired
    private BrandRepository brandRepository;

    @Test
    void findByBrandId_ShouldReturnModels() {
        Brand brand = new Brand();
        brand.setName("Toyota");
        brandRepository.save(brand);

        CarModel model = new CarModel();
        model.setName("Corolla");
        model.setBrand(brand);
        carModelRepository.save(model);

        List<CarModel> models = carModelRepository.findByBrandId(brand.getId());

        assertEquals(1, models.size());
        assertEquals("Corolla", models.get(0).getName());
    }
}
