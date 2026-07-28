package ma.dpss.candidature.repository;

import ma.dpss.candidature.model.Enseignant;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EnseignantRepository
        extends MongoRepository<Enseignant,String> {

}