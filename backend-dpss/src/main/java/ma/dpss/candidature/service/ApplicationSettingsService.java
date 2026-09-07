package ma.dpss.candidature.service;

import org.springframework.stereotype.Service;

import ma.dpss.candidature.model.ApplicationSettings;
import ma.dpss.candidature.repository.ApplicationSettingsRepository;

@Service
public class ApplicationSettingsService {

    private final ApplicationSettingsRepository repository;

    public ApplicationSettingsService(ApplicationSettingsRepository repository) {
        this.repository = repository;
    }

    public boolean areApplicationsOpen() {
        return getSettings().isApplicationsOpen();
    }

    public boolean setApplicationsOpen(boolean open) {
        ApplicationSettings settings = getSettings();
        settings.setApplicationsOpen(open);
        return repository.save(settings).isApplicationsOpen();
    }

    private ApplicationSettings getSettings() {
        return repository.findById(ApplicationSettings.SINGLETON_ID)
                .orElseGet(() -> repository.save(
                        new ApplicationSettings(ApplicationSettings.SINGLETON_ID, true)
                ));
    }
}
