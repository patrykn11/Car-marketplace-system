package com.pap25.eitimoto_backend.repository;

import com.pap25.eitimoto_backend.entities.Brand;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Import(com.pap25.eitimoto_backend.TestContainersConfig.class)
@Transactional
class BrandRepositoryTest {

    @Autowired
    private BrandRepository brandRepository;

    @Test
    void testSaveAndFindBrand() {
        Brand brand = Brand.builder()
                .name("TestAudi")
                .logoUrl("http://example.com/audi.png")
                .build();
        Brand savedBrand = brandRepository.save(brand);

        assertNotNull(savedBrand.getId());
        assertEquals("TestAudi", savedBrand.getName());

        Brand foundBrand = brandRepository.findById(savedBrand.getId()).orElse(null);
        assertNotNull(foundBrand);
        assertEquals("TestAudi", foundBrand.getName());
    }

    @Test
    void testBrandNameUnique() {
        Brand brand1 = Brand.builder()
                .name("TestMercedes")
                .logoUrl("http://example.com/mercedes.png")
                .build();
        brandRepository.save(brand1);

        Brand brand2 = Brand.builder()
                .name("TestMercedes")
                .logoUrl("http://example.com/other.png")
                .build();

        // Expectation: constraint violation
        assertThrows(DataIntegrityViolationException.class, () -> {
             brandRepository.saveAndFlush(brand2);
        });
    }
}
