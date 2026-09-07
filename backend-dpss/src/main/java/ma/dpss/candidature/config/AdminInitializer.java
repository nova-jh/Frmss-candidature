package ma.dpss.candidature.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import ma.dpss.candidature.model.Admin;
import ma.dpss.candidature.repository.AdminRepository;

@Component
public class AdminInitializer implements ApplicationRunner {

    private final AdminRepository adminRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final String email;
    private final String password;

    public AdminInitializer(
            AdminRepository adminRepository,
            BCryptPasswordEncoder passwordEncoder,
            @Value("${app.admin.email:}") String email,
            @Value("${app.admin.password:}") String password) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.email = email.trim();
        this.password = password;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (email.isEmpty() && password.isEmpty()) {
            return;
        }
        if (email.isEmpty() || password.length() < 8) {
            throw new IllegalStateException(
                    "ADMIN_EMAIL et ADMIN_PASSWORD (8 caracteres minimum) doivent etre configures ensemble"
            );
        }
        if (adminRepository.count() == 0) {
            Admin admin = new Admin(null, email, passwordEncoder.encode(password), "Administrateur", "ADMIN");
            adminRepository.save(admin);
        }
    }
}
