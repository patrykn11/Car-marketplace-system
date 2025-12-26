package com.pap25.eitimoto_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.pap25.eitimoto_backend.entities.CarModel;
import java.util.List;

public interface CarModelRepository extends JpaRepository<CarModel, Long> {
    List<CarModel> findByBrandId(Long brandId);
}
