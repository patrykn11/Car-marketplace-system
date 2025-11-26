package com.pap25.eitimoto_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

import com.pap25.eitimoto_backend.entities.Engine;

public interface EngineRepository extends JpaRepository<Engine, Long> {
    Optional<Engine> findByEngineCode(String engineCode);
    boolean existsByEngineCode(String engineCode);
}
