package com.pap25.eitimoto_backend.entities;

import org.junit.jupiter.api.Test;
import java.util.Map;
import static org.junit.jupiter.api.Assertions.*;

class SavedSearchTest {

    @Test
    void builder_ShouldConstructValidSavedSearch() {
        User user = User.builder().username("Searcher").build();
        Map<String, Object> criteria = Map.of("brand", "Audi", "minPrice", 20000);

        SavedSearch savedSearch = SavedSearch.builder()
                .id(1L)
                .searchName("Cheap Audis")
                .user(user)
                .criteria(criteria)
                .build();

        assertNotNull(savedSearch);
        assertEquals("Cheap Audis", savedSearch.getSearchName());
        assertEquals("Audi", savedSearch.getCriteria().get("brand"));
    }
}
