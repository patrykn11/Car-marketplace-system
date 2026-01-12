package com.pap25.eitimoto_backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

@SpringBootTest
@Import(TestContainersConfig.class)
class EitimotoBackendApplicationTests {

	@Test
	void contextLoads() {
	}

}
