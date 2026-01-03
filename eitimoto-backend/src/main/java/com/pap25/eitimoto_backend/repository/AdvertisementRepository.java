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

    @Query(value = """
        SELECT a.*
        FROM advertisement a
        JOIN car c ON a.car_id = c.car_id
        WHERE (:brand IS NULL OR c.car_brand = :brand)
          AND (:model IS NULL OR c.car_model = :model)
          AND (:bodyType IS NULL OR c.car_body_type = :bodyType)
          AND (:fuelType IS NULL OR c.fuel_type = :fuelType)
          AND (:transmission IS NULL OR c.transmission = :transmission)
          AND (:minPrice IS NULL OR c.price >= :minPrice)
          AND (:maxPrice IS NULL OR c.price <= :maxPrice)
          AND (:minYear IS NULL OR c.production_year >= :minYear)
          AND (:maxYear IS NULL OR c.production_year <= :maxYear)
          AND (:minMileage IS NULL OR c.mileage >= :minMileage)
          AND (:maxMileage IS NULL OR c.mileage <= :maxMileage)
        ORDER BY a.embedding <=> :queryVector ASC
        LIMIT 20
        """, nativeQuery = true)
    List<Advertisement> findBySemantics(
            @Param("queryVector") float[] queryVector,
            @Param("brand") String brand,
            @Param("model") String model,
            @Param("bodyType") String bodyType,
            @Param("fuelType") String fuelType,
            @Param("transmission") String transmission,
            @Param("minPrice") Integer minPrice,
            @Param("maxPrice") Integer maxPrice,
            @Param("minYear") Integer minYear,
            @Param("maxYear") Integer maxYear,
            @Param("minMileage") Integer minMileage,
            @Param("maxMileage") Integer maxMileage
    );
}