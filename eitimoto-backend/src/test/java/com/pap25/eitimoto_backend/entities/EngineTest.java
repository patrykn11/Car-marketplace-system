package com.pap25.eitimoto_backend.entities;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class EngineTest {

    @Test
    void builder_ShouldConstructValidEngine() {
        Engine engine = Engine.builder()
                .engineId(1L)
                .engineBrand("Ferrari")
                .enginePower(670)
                .enginePowerPerLitre(170.0)
                .engineTorque(760)
                .startProductionYear(2015)
                .finishProductionYear(2019)
                .engineCode("F154")
                .engineFuelType(FuelType.GASOLINE)
                .engineDisplacement(3902)
                .numberOfPistons(8)
                .engineConfiguration(EngineConfiguration.V_ENGINE)
                .engineOilCapacity(10.0)
                .build();

        assertNotNull(engine);
        assertEquals("Ferrari", engine.getEngineBrand());
        assertEquals(FuelType.GASOLINE, engine.getEngineFuelType());
        assertEquals(EngineConfiguration.V_ENGINE, engine.getEngineConfiguration());
    }
}
