package com.pap25.eitimoto_backend.repository;

import com.pap25.eitimoto_backend.entities.FavoriteAdvertisement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteAdvertisementRepository extends JpaRepository<FavoriteAdvertisement, Long> {

    List<FavoriteAdvertisement> findByUserId(Long userId);

    Optional<FavoriteAdvertisement> findByUserIdAndAdvertisementId(Long userId, Long advertisementId);

    void deleteByUserIdAndAdvertisementId(Long userId, Long advertisementId);

    Long countByAdvertisementIdIn(List<Long> advertisementIds);
}
