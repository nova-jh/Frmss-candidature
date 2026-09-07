package ma.dpss.candidature;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(properties = "app.jwt.secret=test-secret-with-at-least-thirty-two-characters")
class CandidatureDpssApplicationTests {

	@Test
	void contextLoads() {
	}

}
