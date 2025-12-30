package com.pap25.eitimoto_backend.repository;

import com.pap25.eitimoto_backend.entities.Advertisement;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AdvertisementRepository extends JpaRepository<Advertisement, Long> {
    List<Advertisement> findByUserId(Long id);
    List<Advertisement> findByUserUsername(String username);
    Optional<Advertisement> findByAdvertisementId(Long id);
    boolean existsByTitle(String title);

    @Query("SELECT a FROM Advertisement a WHERE a.car.carBrand = :brand AND a.advertisementId NOT IN :excludedIds")
    List<Advertisement> findRecommendationsByBrand(
            @Param("brand") String brand,
            @Param("excludedIds") List<Long> excludedIds,
            Pageable pageable
    );

    @Query("SELECT a FROM Advertisement a WHERE a.advertisementId NOT IN :excludedIds")
    List<Advertisement> findRandomExcept(
            @Param("excludedIds") List<Long> excludedIds,
            Pageable pageable
    );
}