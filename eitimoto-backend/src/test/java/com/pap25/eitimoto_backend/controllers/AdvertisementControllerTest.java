package com.pap25.eitimoto_backend.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pap25.eitimoto_backend.TestContainersConfig;
import com.pap25.eitimoto_backend.dto.AdvertisementDto;
import com.pap25.eitimoto_backend.entities.*;
import com.pap25.eitimoto_backend.repository.AdvertisementRepository;
import com.pap25.eitimoto_backend.repository.UserRepository;
import com.pap25.eitimoto_backend.repository.CarRepository; // Assuming this exists or Car is cascaded
// Actually Car is saved via AdvertisementService possibly, but here we set up data manually or via service.
// Let's use Repositories to setup data state relevant for GET requests.
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@Import(TestContainersConfig.class)
@AutoConfigureMockMvc
@Transactional
class AdvertisementControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private AdvertisementRepository advertisementRepository;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        advertisementRepository.deleteAll();
        userRepository.deleteAll();
    }

    @Test
    void getAllAdvertisements_ShouldReturnList() throws Exception {
        User user = User.builder()
                .username("aduser")
                .password("password")
                .email("ad@example.com")
                .contactNumber("123")
                .location("Loc")
                .role(Role.USER)
                .build();
        userRepository.save(user);

        Car car = Car.builder()
                .carBrand("TestBrand")
                .carModel("TestModel")
                .price(100)
                .productionYear(2020)
                .mileage(1000)
                .carBodyType("Sedan")
                .fuelType("Petrol")
                .transmission("Manual")
                .power(100)
                .carColor("Red")
                .engineCapacity(1.6)
                .build();
        
        Advertisement ad = Advertisement.builder()
                .user(user)
                .car(car)
                .title("Test Ad")
                .description("Desc")
                .location("Loc")
                .viewCount(0L)
                //.isActive(true) // Field does not exist
                .embedding(Collections.nCopies(1536, 0.0)) // Mock embedding
                .build();
        
        advertisementRepository.save(ad);

        mockMvc.perform(get("/api/advertisements")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)));
    }
}
