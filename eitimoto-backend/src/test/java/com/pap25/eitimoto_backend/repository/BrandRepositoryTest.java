package com.pap25.eitimoto_backend.repository;

import com.pap25.eitimoto_backend.TestContainersConfig;
import com.pap25.eitimoto_backend.entities.Brand;
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
class BrandRepositoryTest {

    @Autowired
    private BrandRepository brandRepository;

    @Test
    void findAll_ShouldReturnBrands() {
        Brand brand = new Brand();
        brand.setName("Honda");
        brandRepository.save(brand);

        List<Brand> brands = brandRepository.findAll();


        long count = brands.stream().filter(b -> "Honda".equals(b.getName())).count();
        assertEquals(1, count);
    }
}
