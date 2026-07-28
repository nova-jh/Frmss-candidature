package ma.dpss.candidature.controller;

import jakarta.validation.Valid;
import ma.dpss.candidature.model.Candidature;
import ma.dpss.candidature.model.StatutCandidature;
import ma.dpss.candidature.service.CandidatureService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ma.dpss.candidature.model.DashboardStats;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/candidatures")
@CrossOrigin(origins = "*")
public class CandidatureController {

    private final CandidatureService candidatureService;

    public CandidatureController(CandidatureService candidatureService) {
        this.candidatureService = candidatureService;
    }

    // ==========================
    // Déposer une candidature
    // ==========================
    @PostMapping
    public ResponseEntity<Candidature> soumettreCandidature(
            @Valid @RequestBody Candidature candidature) {

        candidature.setDateSoumission(LocalDateTime.now());
        candidature.setStatut(StatutCandidature.EN_ATTENTE);

        return ResponseEntity.ok(
                candidatureService.save(candidature)
        );
    }

    // ==========================
    // Voir toutes les candidatures
    // ==========================
    @GetMapping
    public ResponseEntity<List<Candidature>> voirToutesLesCandidatures() {

        return ResponseEntity.ok(
                candidatureService.getAllCandidatures()
        );

    }

    // ==========================
    // Voir une candidature
    // ==========================
    @GetMapping("/{id}")
    public ResponseEntity<Candidature> voirCandidatureParId(
            @PathVariable String id) {

        return ResponseEntity.ok(
                candidatureService.getCandidatureById(id)
        );

    }

    // ==========================
    // Modifier une candidature
    // ==========================
    @PutMapping("/{id}")
    public ResponseEntity<Candidature> modifierCandidature(

            @PathVariable String id,

            @RequestBody Candidature candidatureModifiee) {

        Candidature candidature =
                candidatureService.getCandidatureById(id);

        candidature.setNomComplet(
                candidatureModifiee.getNomComplet());

        candidature.setCodeMassar(
                candidatureModifiee.getCodeMassar());

        candidature.setDateNaissance(
                candidatureModifiee.getDateNaissance());

        candidature.setLieuNaissance(
                candidatureModifiee.getLieuNaissance());

        candidature.setTelephone(
                candidatureModifiee.getTelephone());

        candidature.setEmail(
                candidatureModifiee.getEmail());

        candidature.setEtablissement(
                candidatureModifiee.getEtablissement());

        candidature.setSpecialiteBac(
                candidatureModifiee.getSpecialiteBac());

        candidature.setMoyenneBac(
                candidatureModifiee.getMoyenneBac());

        candidature.setFiliereSportEtude(
                candidatureModifiee.getFiliereSportEtude());

        candidature.setEtablissementSup(
                candidatureModifiee.getEtablissementSup());

        candidature.setChampionnatsInternationaux(
                candidatureModifiee.getChampionnatsInternationaux());

        candidature.setChampionnatsNationaux(
                candidatureModifiee.getChampionnatsNationaux());

        candidature.setStatut(
                candidatureModifiee.getStatut());

        return ResponseEntity.ok(
                candidatureService.save(candidature)
        );
    }

    // ==========================
    // Supprimer
    // ==========================
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimerCandidature(
            @PathVariable String id) {

        if (!candidatureService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        candidatureService.delete(id);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardStats> dashboard() {
        return ResponseEntity.ok(
            candidatureService.getDashboardStats()
        );
    }

   

    //ajouter la route
    @PatchMapping("/{id}/statut")
    public ResponseEntity<Candidature> updateStatut(
        @PathVariable String id, 
        @RequestBody Map<String, String> body) {
        try {
                StatutCandidature statut =StatutCandidature.valueOf(body.get("statut"));
                Candidature candidature =candidatureService.updateStatut(id, statut);
                return ResponseEntity.ok(candidature);
        } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().build();
        } catch (RuntimeException e) {
                return ResponseEntity.notFound().build();
        }
   } 
}