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

    public AdminService(AdminRepository adminRepository, BCryptPasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Admin login(LoginRequest request) {
        Admin admin = adminRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("البريد الإلكتروني غير صحيح"));

        if (!passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
            throw new RuntimeException("كلمة المرور غير صحيحة");
        }

        return admin;
    }

    public Admin updateEmail(String adminId, String newEmail) {
        if (newEmail == null || newEmail.isBlank()) {
            throw new RuntimeException("يرجى إدخال بريد إلكتروني صحيح");
        }

        Admin admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("المستخدم غير موجود"));

        adminRepository.findByEmail(newEmail).ifPresent(existingAdmin -> {
            if (!existingAdmin.getId().equals(adminId)) {
                throw new RuntimeException("هذا البريد الإلكتروني مستخدم بالفعل");
            }
        });


        admin.setEmail(newEmail);
        return adminRepository.save(admin);
    }

    public void updatePassword(String adminId, String currentPassword, String newPassword) {
        Admin admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("المستخدم غير موجود"));

        if (!passwordEncoder.matches(currentPassword, admin.getPassword())) {
            throw new RuntimeException("كلمة المرور الحالية غير صحيحة");
        }

        admin.setPassword(passwordEncoder.encode(newPassword));
        adminRepository.save(admin);
    }
}