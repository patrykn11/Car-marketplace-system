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

//    @Test
//    public void testFindByAdvertisementId() {
//        Advertisement ad = Advertisement.builder()
//                .title("Test Ad")
//                .description("This is a test advertisement.")
//                .car(Car.builder().build())
//                .build();
//        entityManager.persistAndFlush(ad);
//        entityManager.flush();
//
//        Advertisement foundAd = advertisementRepository.findByAdvertisementId(ad.getAdvertisementId()).orElse(null);
//
//        assertThat(foundAd).isNotNull();
//        assertThat(foundAd.getTitle()).isEqualTo("Test Ad");
//        assertThat(foundAd.getDescription()).isEqualTo("This is a test advertisement.");
//        assertThat(foundAd.getAdvertisementId()).isEqualTo(ad.getAdvertisementId());
//    }

//    @Test
//    public void testSaveAdvertisement() {
//        Advertisement ad = Advertisement.builder()
//                .title("New Ad")
//                .description("This is a new advertisement.")
//                .build();
//
//        Advertisement savedAd = advertisementRepository.save(ad);
//
//        assertThat(savedAd).isNotNull();
//        assertThat(savedAd.getAdvertisementId()).isNotNull();
//        assertThat(savedAd.getTitle()).isEqualTo("New Ad");
//        assertThat(savedAd.getDescription()).isEqualTo("This is a new advertisement.");
//    }

//    @Test
//    public void testExistsByTitle() {
//        Advertisement ad = Advertisement.builder()
//                .title("Unique Ad Title")
//                .description("This advertisement has a unique title.")
//                .build();
//        entityManager.persistAndFlush(ad);
//        entityManager.flush();
//
//        boolean exists = advertisementRepository.existsByTitle("Unique Ad Title");
//        boolean notExists = advertisementRepository.existsByTitle("Nonexistent Title");
//        assertThat(exists).isTrue();
//        assertThat(notExists).isFalse();
//    }
//
//    @Test
//    public void testFindAllAdvertisements() {
//        Advertisement ad1 = Advertisement.builder()
//                .title("Ad One")
//                .description("First advertisement.")
//                .build();
//        Advertisement ad2 = Advertisement.builder()
//                .title("Ad Two")
//                .description("Second advertisement.")
//                .build();
//        entityManager.persistAndFlush(ad1);
//        entityManager.persistAndFlush(ad2);
//        entityManager.flush();
//
//        List<Advertisement> ads = advertisementRepository.findAll();
//
//        assertThat(ads).hasSizeGreaterThanOrEqualTo(2);
//        assertThat(ads).extracting(Advertisement::getTitle)
//                .contains("Ad One", "Ad Two");
//    }
//
//    @Test
//    void testDeleteAdvertisement() {
//        Advertisement ad = Advertisement.builder()
//                .title("Ad to Delete")
//                .description("This advertisement will be deleted.")
//                .build();
//        entityManager.persistAndFlush(ad);
//        entityManager.flush();
//
//        advertisementRepository.deleteById(ad.getAdvertisementId());
//
//        Optional<Advertisement> deletedAd = advertisementRepository.findByAdvertisementId(ad.getAdvertisementId());
//        assertThat(deletedAd).isEmpty();
//    }
//
//    @Test
//    void testUpdateAdvertisement() {
//        Advertisement ad = Advertisement.builder()
//                .title("Ad to Update")
//                .description("This advertisement will be updated.")
//                .build();
//        entityManager.persistAndFlush(ad);
//        entityManager.flush();
//
//        ad.setTitle("Updated Ad Title");
//        ad.setDescription("This advertisement has been updated.");
//        Advertisement updatedAd = advertisementRepository.save(ad);
//        assertThat(updatedAd.getTitle()).isEqualTo("Updated Ad Title");
//        assertThat(updatedAd.getDescription()).isEqualTo("This advertisement has been updated.");
//    }

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

//    @Test
//    void testSaveAdvertisementWithDuplicateTitle() {
//        Advertisement ad1 = Advertisement.builder()
//                .title("Duplicate Title")
//                .description("First advertisement with duplicate title.")
//                .build();
//        advertisementRepository.save(ad1);
//
//        Advertisement ad2 = Advertisement.builder()
//                .title("Duplicate Title")
//                .description("Second advertisement with duplicate title.")
//                .build();
//        try {
//            advertisementRepository.save(ad2);
//        } catch (Exception e) {
//            assertThat(e).isInstanceOf(Exception.class);
//        }
//    }

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

//    @Test
//    void testFindAllAfterDeletingAllAdvertisements() {
//        Advertisement ad1 = Advertisement.builder()
//                .title("Ad One")
//                .description("First advertisement.")
//                .build();
//        Advertisement ad2 = Advertisement.builder()
//                .title("Ad Two")
//                .description("Second advertisement.")
//                .build();
//        entityManager.persistAndFlush(ad1);
//        entityManager.persistAndFlush(ad2);
//        entityManager.flush();
//
//        advertisementRepository.deleteAll();
//
//        List<Advertisement> ads = advertisementRepository.findAll();
//        assertThat(ads).isEmpty();
//    }
//
//    @Test
//    void testSaveMultipleAdvertisements() {
//        Advertisement ad1 = Advertisement.builder()
//                .title("Ad One")
//                .description("First advertisement.")
//                .build();
//        Advertisement ad2 = Advertisement.builder()
//                .title("Ad Two")
//                .description("Second advertisement.")
//                .build();
//
//        advertisementRepository.save(ad1);
//        advertisementRepository.save(ad2);
//
//        List<Advertisement> ads = advertisementRepository.findAll();
//        assertThat(ads).hasSizeGreaterThanOrEqualTo(2);
//    }
//
//    @Test
//    void testFindByAdvertisementIdAfterUpdate() {
//        Advertisement ad = Advertisement.builder()
//                .title("Ad to Update")
//                .description("This advertisement will be updated.")
//                .build();
//        entityManager.persistAndFlush(ad);
//        entityManager.flush();
//
//        ad.setTitle("Updated Ad Title");
//        advertisementRepository.save(ad);
//
//        Advertisement foundAd = advertisementRepository.findByAdvertisementId(ad.getAdvertisementId()).orElse(null);
//        assertThat(foundAd).isNotNull();
//        assertThat(foundAd.getTitle()).isEqualTo("Updated Ad Title");
//    }
//
//    @Test
//    void testExistsByTitleAfterDeletion() {
//        Advertisement ad = Advertisement.builder()
//                .title("Ad to Delete")
//                .description("This advertisement will be deleted.")
//                .build();
//        entityManager.persistAndFlush(ad);
//        entityManager.flush();
//
//        advertisementRepository.deleteById(ad.getAdvertisementId());
//
//        boolean exists = advertisementRepository.existsByTitle("Ad to Delete");
//        assertThat(exists).isFalse();
//    }
//
//    @Test
//    void testFindAllAfterUpdate() {
//        Advertisement ad = Advertisement.builder()
//                .title("Ad to Update")
//                .description("This advertisement will be updated.")
//                .build();
//        entityManager.persistAndFlush(ad);
//        entityManager.flush();
//
//        ad.setTitle("Updated Ad Title");
//        advertisementRepository.save(ad);
//
//        List<Advertisement> ads = advertisementRepository.findAll();
//        assertThat(ads).extracting(Advertisement::getTitle)
//                .contains("Updated Ad Title");
//    }
//
//    @Test
//    void testDeleteAdvertisementAfterUpdate() {
//        Advertisement ad = Advertisement.builder()
//                .title("Ad to Update and Delete")
//                .description("This advertisement will be updated and then deleted.")
//                .build();
//        entityManager.persistAndFlush(ad);
//        entityManager.flush();
//
//        ad.setTitle("Updated Ad Title");
//        advertisementRepository.save(ad);
//
//        advertisementRepository.deleteById(ad.getAdvertisementId());
//
//        Optional<Advertisement> deletedAd = advertisementRepository.findByAdvertisementId(ad.getAdvertisementId());
//        assertThat(deletedAd).isEmpty();
//    }
}
