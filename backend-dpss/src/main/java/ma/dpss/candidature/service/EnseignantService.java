package ma.dpss.candidature.service;

import ma.dpss.candidature.model.Enseignant;
import ma.dpss.candidature.model.ResultatEnseignant;
import ma.dpss.candidature.repository.EnseignantRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnseignantService {

    private final EnseignantRepository repository;

    public EnseignantService(EnseignantRepository repository) {

        this.repository = repository;

    }

    public Enseignant save(Enseignant enseignant){

        return repository.save(enseignant);

    }

    public List<Enseignant> getAll(){

        return repository.findAll();

    }

    public Enseignant getById(String id){

        return repository.findById(id)

                .orElseThrow(() ->
                        new RuntimeException("Enseignant introuvable"));

    }

    public void delete(String id){

        repository.deleteById(id);

    }

    // ==========================
    // Classement des enseignants
    // ==========================
    public List<Enseignant> getClassement() {

        List<Enseignant> enseignants = repository.findAll();

        enseignants.sort((e1, e2) ->

                Integer.compare(
                        getMeilleurRang(e1),
                        getMeilleurRang(e2)
                )

        );

        return enseignants;

    }

    // ==========================
    // Meilleur rang obtenu
    // ==========================
    private int getMeilleurRang(Enseignant enseignant) {

        if (enseignant.getResultats() == null ||
                enseignant.getResultats().isEmpty()) {

            return Integer.MAX_VALUE;

        }

        int meilleur = Integer.MAX_VALUE;

        for (ResultatEnseignant resultat : enseignant.getResultats()) {

            try {

                int rang = Integer.parseInt(resultat.getClassement().trim());

                if (rang < meilleur) {

                    meilleur = rang;

                }

            } catch (Exception ignored) {

            }

        }

        return meilleur;

    }

}