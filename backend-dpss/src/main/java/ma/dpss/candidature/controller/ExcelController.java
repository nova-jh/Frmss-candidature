package ma.dpss.candidature.controller;

import ma.dpss.candidature.service.ExcelExportService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/excel")
@CrossOrigin(origins = "http://localhost:5173")
public class ExcelController {

    private final ExcelExportService excelExportService;

    public ExcelController(ExcelExportService excelExportService) {
        this.excelExportService = excelExportService;
    }

    @GetMapping("/export")
    public ResponseEntity<byte[]> exporterExcel(
            @RequestParam(defaultValue = "moyenne") String type) {

        try {

            byte[] fichier = excelExportService.exportClassement(type);

            return ResponseEntity.ok()

                    .header(
                            HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=classement.xlsx"
                    )

                    .contentType(
                            MediaType.APPLICATION_OCTET_STREAM
                    )

                    .body(fichier);

        }

        catch (Exception e) {

            return ResponseEntity.internalServerError().build();

        }

    }

}