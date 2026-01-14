package com.pap25.eitimoto_backend.entities;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class TransmissionTypeTest {
    @Test
    void enumValues_ShouldBeCorrect() {
        assertNotNull(TransmissionType.values());
    }
}
