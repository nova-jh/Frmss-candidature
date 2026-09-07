package ma.dpss.candidature.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import ma.dpss.candidature.model.ApplicationSettings;

public interface ApplicationSettingsRepository extends MongoRepository<ApplicationSettings, String> {
}
