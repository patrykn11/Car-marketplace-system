package com.pap25.eitimoto_backend.repository;

import com.pap25.eitimoto_backend.entities.FavoriteAdvertisement;
import com.pap25.eitimoto_backend.entities.Role;
import com.pap25.eitimoto_backend.entities.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class FavAddRepositoryTest {

    @Autowired
    private FavoriteAdvertisementRepository favAddRepository;

    @Autowired
    private TestEntityManager entityManager;

    @Test
    void returnsFavoriteAdsWhenFindByUserId() {
        User user = new User(null, "user1", "password1", Role.USER, null);
        entityManager.persistAndFlush(user);

        FavoriteAdvertisement fav1 = FavoriteAdvertisement.builder()
                .user(user)
                .advertisementId(101L)
                .build();
        FavoriteAdvertisement fav2 = FavoriteAdvertisement.builder()
                .user(user)
                .advertisementId(102L)
                .build();
        entityManager.persistAndFlush(fav1);
        entityManager.persistAndFlush(fav2);
        entityManager.flush();

        List<FavoriteAdvertisement> result = favAddRepository.findByUserId(user.getId());

        assertThat(result).hasSize(2);
        assertThat(result).extracting(FavoriteAdvertisement::getAdvertisementId)
                .containsExactlyInAnyOrder(101L, 102L);
    }

    @Test
    void returnsFavoriteAdWhenFindByUserIdAndAdvertisementId() {
        User user = new User(null, "user2", "password2", Role.USER, null);
        entityManager.persistAndFlush(user);

        FavoriteAdvertisement fav = FavoriteAdvertisement.builder()
                .user(user)
                .advertisementId(201L)
                .build();
        entityManager.persistAndFlush(fav);
        entityManager.flush();

        Optional<FavoriteAdvertisement> result = favAddRepository.findByUserIdAndAdvertisementId(user.getId(), 201L);

        assertThat(result).isPresent();
        assertThat(result.get().getAdvertisementId()).isEqualTo(201L);
    }

    @Test
    void deletesFavoriteAdWhenDeleteByUserIdAndAdvertisementId() {
        User user = new User(null, "user3", "password3", Role.USER, null);
        entityManager.persistAndFlush(user);

        FavoriteAdvertisement fav = FavoriteAdvertisement.builder()
                .user(user)
                .advertisementId(301L)
                .build();
        entityManager.persistAndFlush(fav);
        entityManager.flush();

        favAddRepository.deleteByUserIdAndAdvertisementId(user.getId(), 301L);
        entityManager.flush();

        Optional<FavoriteAdvertisement> result = favAddRepository.findByUserIdAndAdvertisementId(user.getId(), 301L);
        assertThat(result).isNotPresent();
    }

    @Test
    void returnsEmptyWhenNoFavoriteAdFound() {
        Optional<FavoriteAdvertisement> result = favAddRepository.findByUserIdAndAdvertisementId(999L, 999L);
        assertThat(result).isNotPresent();
    }

    @Test
    void returnsEmptyListWhenNoFavoritesForUser() {
        List<FavoriteAdvertisement> result = favAddRepository.findByUserId(888L);
        assertThat(result).isEmpty();
    }

    @Test
    void doesNotDeleteWhenNoMatchingFavoriteAd() {
        favAddRepository.deleteByUserIdAndAdvertisementId(777L, 777L);
        List<FavoriteAdvertisement> result = favAddRepository.findByUserId(777L);
        assertThat(result).isEmpty();
    }

    @Test
    void handlesMultipleUsersFavoritesCorrectly() {
        User userA = new User(null, "userA", "passwordA", Role.USER, null);
        User userB = new User(null, "userB", "passwordB", Role.USER, null);
        entityManager.persistAndFlush(userA);
        entityManager.persistAndFlush(userB);

        FavoriteAdvertisement favA1 = FavoriteAdvertisement.builder()
                .user(userA)
                .advertisementId(401L)
                .build();
        FavoriteAdvertisement favB1 = FavoriteAdvertisement.builder()
                .user(userB)
                .advertisementId(501L)
                .build();
        entityManager.persistAndFlush(favA1);
        entityManager.persistAndFlush(favB1);
        entityManager.flush();

        List<FavoriteAdvertisement> resultA = favAddRepository.findByUserId(userA.getId());
        List<FavoriteAdvertisement> resultB = favAddRepository.findByUserId(userB.getId());

        assertThat(resultA).hasSize(1);
        assertThat(resultA.getFirst().getAdvertisementId()).isEqualTo(401L);

        assertThat(resultB).hasSize(1);
        assertThat(resultB.getFirst().getAdvertisementId()).isEqualTo(501L);
    }

    @Test
    void canAddAndRetrieveMultipleFavoritesForSameUser() {
        User user = new User(null, "userMulti", "passwordMulti", Role.USER, null);
        entityManager.persistAndFlush(user);

        for (long adId = 601L; adId <= 605L; adId++) {
            FavoriteAdvertisement fav = FavoriteAdvertisement.builder()
                    .user(user)
                    .advertisementId(adId)
                    .build();
            entityManager.persistAndFlush(fav);
        }
        entityManager.flush();

        List<FavoriteAdvertisement> result = favAddRepository.findByUserId(user.getId());

        assertThat(result).hasSize(5);
        assertThat(result).extracting(FavoriteAdvertisement::getAdvertisementId)
                .containsExactlyInAnyOrder(601L, 602L, 603L, 604L, 605L);
    }

    @Test
    void deletingOneFavoriteDoesNotAffectOthers() {
        User user = new User(null, "userDelTest", "passwordDelTest", Role.USER, null);
        entityManager.persistAndFlush(user);

        FavoriteAdvertisement fav1 = FavoriteAdvertisement.builder()
                .user(user)
                .advertisementId(701L)
                .build();
        FavoriteAdvertisement fav2 = FavoriteAdvertisement.builder()
                .user(user)
                .advertisementId(702L)
                .build();
        entityManager.persistAndFlush(fav1);
        entityManager.persistAndFlush(fav2);
        entityManager.flush();

        favAddRepository.deleteByUserIdAndAdvertisementId(user.getId(), 701L);
        entityManager.flush();

        List<FavoriteAdvertisement> result = favAddRepository.findByUserId(user.getId());

        assertThat(result).hasSize(1);
        assertThat(result.getFirst().getAdvertisementId()).isEqualTo(702L);
    }

    @Test
    void handlesLargeNumberOfFavorites() {
        User user = new User(null, "userLarge", "passwordLarge", Role.USER, null);
        entityManager.persistAndFlush(user);

        for (long adId = 800L; adId < 900L; adId++) {
            FavoriteAdvertisement fav = FavoriteAdvertisement.builder()
                    .user(user)
                    .advertisementId(adId)
                    .build();
            entityManager.persistAndFlush(fav);
        }
        entityManager.flush();

        List<FavoriteAdvertisement> result = favAddRepository.findByUserId(user.getId());

        assertThat(result).hasSize(100);
    }

    @Test
    void canHandleNullUserGracefully() {
        List<FavoriteAdvertisement> result = favAddRepository.findByUserId(null);
        assertThat(result).isEmpty();
    }

    @Test
    void canHandleNullAdvertisementIdGracefully() {
        User user = new User(null, "userNullAd", "passwordNullAd", Role.USER, null);
        entityManager.persistAndFlush(user);

        Optional<FavoriteAdvertisement> result = favAddRepository.findByUserIdAndAdvertisementId(user.getId(), null);
        assertThat(result).isNotPresent();
    }

    @Test
    void deletingWithNullValuesDoesNotThrow() {
        favAddRepository.deleteByUserIdAndAdvertisementId(null, null);
    }

    @Test
    void repositoryIsEmptyInitially() {
        List<FavoriteAdvertisement> result = favAddRepository.findAll();
        assertThat(result).isEmpty();
    }
}
