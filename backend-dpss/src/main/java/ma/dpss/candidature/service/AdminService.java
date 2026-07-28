package ma.dpss.candidature.service;

import ma.dpss.candidature.dto.LoginRequest;
import ma.dpss.candidature.model.Admin;
import ma.dpss.candidature.repository.AdminRepository;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private final AdminRepository adminRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public AdminService(
            AdminRepository adminRepository,
            BCryptPasswordEncoder passwordEncoder) {

        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Admin login(LoginRequest request) {

        Admin admin = adminRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Email incorrect"));

        if (!passwordEncoder.matches(
                request.getPassword(),
                admin.getPassword())) {

            throw new RuntimeException("Mot de passe incorrect");
        }

        return admin;
    }

}