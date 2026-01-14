package com.pap25.eitimoto_backend.entities;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class EngineConfigurationTest {
    @Test
    void enumValues_ShouldBeCorrect() {
        assertEquals("V_ENGINE", EngineConfiguration.V_ENGINE.name());
    }
}
