package ma.dpss.candidature.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ma.dpss.candidature.service.ApplicationSettingsService;

@RestController
@RequestMapping("/api/settings/application-status")
public class ApplicationSettingsController {

    private final ApplicationSettingsService settingsService;

    public ApplicationSettingsController(ApplicationSettingsService settingsService) {
        this.settingsService = settingsService;
    }

    @GetMapping
    public Map<String, Boolean> getStatus() {
        return Map.of("open", settingsService.areApplicationsOpen());
    }

    @PutMapping
    public ResponseEntity<Map<String, Boolean>> updateStatus(@RequestBody Map<String, Boolean> request) {
        Boolean open = request.get("open");
        if (open == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(Map.of("open", settingsService.setApplicationsOpen(open)));
    }
}
