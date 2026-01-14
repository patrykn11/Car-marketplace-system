package com.pap25.eitimoto_backend.repository;

import com.pap25.eitimoto_backend.TestContainersConfig;
import com.pap25.eitimoto_backend.entities.Engine;
import com.pap25.eitimoto_backend.entities.FuelType;
import com.pap25.eitimoto_backend.entities.EngineConfiguration;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertTrue;

@DataJpaTest
@Import(TestContainersConfig.class)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
class EngineRepositoryTest {

    @Autowired
    private EngineRepository engineRepository;

    @Test
    void findByEngineCode_ShouldReturnEngine() {
        Engine engine = new Engine();
        engine.setEngineCode("V8-SUPER");
        engine.setEngineBrand("Generic");
        engine.setEnginePower(500);
        engine.setEnginePowerPerLitre(100.0); // Dummy value
        engine.setEngineTorque(600);
        engine.setStartProductionYear(2023);
        engine.setFinishProductionYear(2024);
        engine.setEngineFuelType(FuelType.GASOLINE); // Assuming enum exists or similar
        engine.setEngineDisplacement(5000);
        engine.setNumberOfPistons(8);
        engine.setEngineConfiguration(EngineConfiguration.V_ENGINE); // Assuming enum exists
        engine.setEngineOilCapacity(5.0);

        engineRepository.save(engine);

        Optional<Engine> found = engineRepository.findByEngineCode("V8-SUPER");

        assertTrue(found.isPresent());
    }
}
