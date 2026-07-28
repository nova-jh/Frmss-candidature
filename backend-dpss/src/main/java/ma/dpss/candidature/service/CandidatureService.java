package ma.dpss.candidature.service;

import ma.dpss.candidature.model.Candidature;
import ma.dpss.candidature.repository.CandidatureRepository;
import ma.dpss.candidature.repository.EnseignantRepository;
import org.springframework.stereotype.Service;
import ma.dpss.candidature.model.DashboardStats;
import ma.dpss.candidature.model.StatutCandidature;

import java.util.List;

@Service
public class CandidatureService {

    private final CandidatureRepository candidatureRepository;
    private final EnseignantRepository enseignantRepository;

    public CandidatureService(
            CandidatureRepository candidatureRepository,
            EnseignantRepository enseignantRepository) {
        this.candidatureRepository = candidatureRepository;
        this.enseignantRepository = enseignantRepository;
    }

    // Récupérer toutes les candidatures
    public List<Candidature> getAllCandidatures() {
        return candidatureRepository.findAll();
    }

    // Récupérer une candidature par son ID
    public Candidature getCandidatureById(String id) {
        return candidatureRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Candidature introuvable"));
    }

    // Enregistrer une candidature
    public Candidature save(Candidature candidature) {
        return candidatureRepository.save(candidature);
    }

    // Supprimer une candidature
    public void delete(String id) {
        candidatureRepository.deleteById(id);
    }

    public boolean existsById(String id) {
        return candidatureRepository.existsById(id);
    }

    public DashboardStats getDashboardStats() {
        List<Candidature> candidatures = candidatureRepository.findAll();
        long total = candidatures.size();
        long totalEnseignants = enseignantRepository.count();
        long enAttente = candidatures.stream()
            .filter(c -> c.getStatut() == StatutCandidature.EN_ATTENTE)
            .count();
        long acceptees = candidatures.stream()
            .filter(c -> c.getStatut() == StatutCandidature.ACCEPTEE)
            .count();
        long refusees = candidatures.stream()
            .filter(c -> c.getStatut() == StatutCandidature.REFUSEE)
            .count();
            
        return new DashboardStats(
            total,
            totalEnseignants,
            enAttente,
            acceptees,
            refusees
        );
    }
    
    public Candidature updateStatut(String id, StatutCandidature statut) {
        Candidature candidature = candidatureRepository.findById(id).orElseThrow(() -> new RuntimeException("Candidature introuvable"));
        candidature.setStatut(statut);
        return candidatureRepository.save(candidature);
    }

}
