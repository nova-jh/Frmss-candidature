package ma.dpss.candidature.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "application_settings")
public class ApplicationSettings {

    public static final String SINGLETON_ID = "applications";

    @Id
    private String id;
    private boolean applicationsOpen;

    public ApplicationSettings() {
    }

    public ApplicationSettings(String id, boolean applicationsOpen) {
        this.id = id;
        this.applicationsOpen = applicationsOpen;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public boolean isApplicationsOpen() {
        return applicationsOpen;
    }

    public void setApplicationsOpen(boolean applicationsOpen) {
        this.applicationsOpen = applicationsOpen;
    }
}
