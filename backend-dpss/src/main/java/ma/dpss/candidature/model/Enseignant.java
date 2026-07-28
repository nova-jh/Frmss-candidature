package ma.dpss.candidature.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "candidatures-enseignants")
public class Enseignant {

    @Id
    private String id;

    private String nomComplet;

    private String numeroPpr;

    private String telephone;

    private String email;

    private String cadre;

    private String etablissement;

    private String directionProvinciale;

    private String academie;

    private List<ResultatEnseignant> resultats;

}