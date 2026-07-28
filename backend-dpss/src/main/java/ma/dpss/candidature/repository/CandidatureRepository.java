package ma.dpss.candidature.repository;

import ma.dpss.candidature.model.Candidature;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
//La couche Repository (Le pont avec MongoDB) : C'est un petit fichier qui 
// va dire à Java comment sauvegarder, lire ou supprimer 
// une candidature dans la base de données.

public interface CandidatureRepository extends MongoRepository<Candidature, String> {
    //Spring Boot va générer tout le code SQL/MongoDB automatiquement 
    // pour sauvegarder (save), trouver (findAll), ou supprimer (deleteById) une candidature.
}