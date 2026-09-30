package ma.dpss.candidature;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.mongodb.autoconfigure.MongoConnectionDetails;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;

@SpringBootTest(properties = {
        "MONGODB_URI=mongodb://127.0.0.1:1/deployment-config-check?connectTimeoutMS=100&serverSelectionTimeoutMS=100",
        "app.jwt.secret=test-secret-with-at-least-thirty-two-characters",
        "app.admin.email=",
        "app.admin.password=",
        "logging.level.org.mongodb.driver=OFF"
})
class MongoDeploymentConfigurationTests {

    @Autowired
    private MongoConnectionDetails connectionDetails;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Test
    void usesEnvironmentUriForHostAndDatabaseWithoutConnectingToAtlas() {
        assertEquals(List.of("127.0.0.1:1"), connectionDetails.getConnectionString().getHosts());
        assertEquals("deployment-config-check", mongoTemplate.getDb().getName());
    }
}
