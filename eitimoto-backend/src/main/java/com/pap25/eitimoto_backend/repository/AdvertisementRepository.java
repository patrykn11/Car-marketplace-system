package com.pap25.eitimoto_backend.repository;

import com.pap25.eitimoto_backend.dto.AdvertisementResponseDto;
import com.pap25.eitimoto_backend.entities.Advertisement;
import com.pap25.eitimoto_backend.entities.Car;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AdvertisementRepository extends JpaRepository<Advertisement, Long> {
    List<Advertisement> findByUserId(Long id);
    List<Advertisement> findByUserUsername(String username);
    Optional<Advertisement> findByAdvertisementId(Long id);
    boolean existsByTitle(String title);
}