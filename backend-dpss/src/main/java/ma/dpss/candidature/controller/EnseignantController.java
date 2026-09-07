package ma.dpss.candidature.controller;

import jakarta.validation.Valid;
import ma.dpss.candidature.model.Enseignant;
import ma.dpss.candidature.service.EnseignantExcelExportService;
import ma.dpss.candidature.service.EnseignantService;
import ma.dpss.candidature.service.ApplicationSettingsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;


import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/enseignants")
public class EnseignantController {

    private final EnseignantService enseignantService;
    private final EnseignantExcelExportService enseignantExcelExportService;
    private final ApplicationSettingsService settingsService;

    public EnseignantController(
            EnseignantService enseignantService,
            EnseignantExcelExportService enseignantExcelExportService,
            ApplicationSettingsService settingsService){

        this.enseignantService = enseignantService;
        this.enseignantExcelExportService = enseignantExcelExportService;
        this.settingsService = settingsService;

    }

    @PostMapping
    public ResponseEntity<?> ajouter(

            @Valid @RequestBody Enseignant enseignant){

        if (!settingsService.areApplicationsOpen()) {
            return ResponseEntity.status(403)
                    .body(Map.of("message", "باب الترشيحات مغلق حاليا"));
        }

        return ResponseEntity.ok(

                enseignantService.save(enseignant)

        );

    }

    @GetMapping
    public ResponseEntity<List<Enseignant>> getAll(){

        return ResponseEntity.ok(

                enseignantService.getAll()

        );

    }

    @GetMapping("/{id}")
    public ResponseEntity<Enseignant> getById(

            @PathVariable String id){

        return ResponseEntity.ok(

                enseignantService.getById(id)

        );

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(

            @PathVariable String id){

        enseignantService.delete(id);

        return ResponseEntity.noContent().build();

    }

    @GetMapping("/classement")
    public ResponseEntity<List<Enseignant>> getClassement() {
        return ResponseEntity.ok(
            enseignantService.getClassement()
        );
    }

    @GetMapping("/export-excel")
    public ResponseEntity<byte[]> exporterExcel() throws IOException {
        byte[] fichier = enseignantExcelExportService.exporter();
        return ResponseEntity.ok()
            .header(
                HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=Classement_Enseignants.xlsx"
            )
            .contentType(
                MediaType.APPLICATION_OCTET_STREAM
            )
            .body(fichier);
        }

}
