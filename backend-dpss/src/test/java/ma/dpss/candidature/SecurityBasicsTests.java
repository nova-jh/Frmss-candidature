package ma.dpss.candidature;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

import org.junit.jupiter.api.Test;

import com.fasterxml.jackson.databind.ObjectMapper;

import ma.dpss.candidature.model.Admin;
import ma.dpss.candidature.service.JwtService;

class SecurityBasicsTests {

    @Test
    void generatedTokenCanBeValidated() {
        JwtService jwtService = new JwtService(
                "test-secret-with-at-least-thirty-two-characters",
                60_000
        );
        Admin admin = new Admin("admin-id", "admin@example.com", "hash", "Admin", "ADMIN");

        String token = jwtService.generateToken(admin);

        assertEquals("admin-id", jwtService.validateAndGetAdminId(token));
    }

    @Test
    void adminPasswordIsNeverSerialized() throws Exception {
        Admin admin = new Admin("admin-id", "admin@example.com", "private-hash", "Admin", "ADMIN");

        String json = new ObjectMapper().writeValueAsString(admin);

        assertFalse(json.contains("private-hash"));
        assertFalse(json.contains("password"));
    }
}
