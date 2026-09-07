package ma.dpss.candidature.dto;

import ma.dpss.candidature.model.Admin;

public record AdminLoginResponse(
        String id,
        String email,
        String nom,
        String role,
        String token) {

    public static AdminLoginResponse from(Admin admin, String token) {
        return new AdminLoginResponse(
                admin.getId(),
                admin.getEmail(),
                admin.getNom(),
                admin.getRole(),
                token
        );
    }
}
