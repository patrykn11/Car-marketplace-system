package com.pap25.eitimoto_backend.repository;

import com.pap25.eitimoto_backend.entities.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CarRepository extends JpaRepository<Car, Long> {
    Optional<Car> findByCarId(Long carId);
    boolean existsByCarId(Long carId);
}