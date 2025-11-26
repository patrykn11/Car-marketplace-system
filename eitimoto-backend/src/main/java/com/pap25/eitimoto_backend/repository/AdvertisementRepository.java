package com.pap25.eitimoto_backend.repository;

import com.pap25.eitimoto_backend.entities.Advertisement;
import com.pap25.eitimoto_backend.entities.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AdvertisementRepository extends JpaRepository<Car, Long> {
    Optional<Advertisement> findByAdvertisementID(Long advertisementID);
    Advertisement save(Advertisement request);
    boolean existsByTitle(String title);
}