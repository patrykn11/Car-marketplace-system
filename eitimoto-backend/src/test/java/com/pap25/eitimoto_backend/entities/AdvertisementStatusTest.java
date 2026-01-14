package com.pap25.eitimoto_backend.entities;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class AdvertisementStatusTest {
    @Test
    void enumValues_ShouldBeCorrect() {
        assertEquals("ACTIVE", AdvertisementStatus.ACTIVE.name());
        assertEquals("SOLD", AdvertisementStatus.SOLD.name());
    }
}
