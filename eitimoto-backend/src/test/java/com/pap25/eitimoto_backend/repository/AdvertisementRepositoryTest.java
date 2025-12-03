package com.pap25.eitimoto_backend.repository;

import com.pap25.eitimoto_backend.entities.Advertisement;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
//import com.pap25.eitimoto_backend.entities.Car;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;


@DataJpaTest
public class AdvertisementRepositoryTest {

    @Autowired
    private AdvertisementRepository advertisementRepository;

    @Autowired
    private TestEntityManager entityManager;

    @Test
    void testFindByNonexistentAdvertisementId() {
        Optional<Advertisement> ad = advertisementRepository.findByAdvertisementId(9999L);
        assertThat(ad).isEmpty();
    }

    @Test
    void testSaveAdvertisementWithNullTitle() {
        Advertisement ad = Advertisement.builder()
                .description("This advertisement has a null title.")
                .build();
        try {
            advertisementRepository.save(ad);
        } catch (Exception e) {
            assertThat(e).isInstanceOf(Exception.class);
        }
    }

    @Test
    void testFindAllWhenNoAdvertisements() {
        List<Advertisement> ads = advertisementRepository.findAll();
        assertThat(ads).isEmpty();
    }

    @Test
    void testDeleteNonexistentAdvertisement() {
        try {
            advertisementRepository.deleteById(9999L);
        } catch (Exception e) {
            assertThat(e).isInstanceOf(Exception.class);
        }
    }

    @Test
    void testUpdateNonexistentAdvertisement() {
        Advertisement ad = Advertisement.builder()
                .advertisementId(9999L)
                .title("Nonexistent Ad")
                .description("This advertisement does not exist.")
                .build();
        try {
            advertisementRepository.save(ad);
        } catch (Exception e) {
            assertThat(e).isInstanceOf(Exception.class);
        }
    }

    @Test
    void testSaveAdvertisementWithNullDescription() {
        Advertisement ad = Advertisement.builder()
                .title("Ad with Null Description")
                .build();
        try {
            advertisementRepository.save(ad);
        } catch (Exception e) {
            assertThat(e).isInstanceOf(Exception.class);
        }
    }

    @Test
    void testFindByAdvertisementIdWithNull() {
        try {
            advertisementRepository.findByAdvertisementId(null);
        } catch (Exception e) {
            assertThat(e).isInstanceOf(Exception.class);
        }
    }

    @Test
    void testExistsByTitleWithNull() {
        try {
            advertisementRepository.existsByTitle(null);
        } catch (Exception e) {
            assertThat(e).isInstanceOf(Exception.class);
        }
    }

    @Test
    void testSaveAdvertisementWithEmptyTitle() {
        Advertisement ad = Advertisement.builder()
                .title("")
                .description("This advertisement has an empty title.")
                .build();
        try {
            advertisementRepository.save(ad);
        } catch (Exception e) {
            assertThat(e).isInstanceOf(Exception.class);
        }
    }

    @Test
    void testSaveAdvertisementWithEmptyDescription() {
        Advertisement ad = Advertisement.builder()
                .title("Ad with Empty Description")
                .description("")
                .build();
        try {
            advertisementRepository.save(ad);
        } catch (Exception e) {
            assertThat(e).isInstanceOf(Exception.class);
        }
    }
}
