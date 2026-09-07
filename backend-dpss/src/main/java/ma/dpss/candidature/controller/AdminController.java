package ma.dpss.candidature.controller;

import jakarta.validation.Valid;
import ma.dpss.candidature.dto.LoginRequest;
import ma.dpss.candidature.dto.AdminLoginResponse;
import ma.dpss.candidature.dto.UpdateEmailRequest;
import ma.dpss.candidature.dto.UpdatePasswordRequest;
import ma.dpss.candidature.model.Admin;
import ma.dpss.candidature.service.AdminService;
import ma.dpss.candidature.service.CandidatureService;
import ma.dpss.candidature.service.JwtService;


import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final AdminService adminService;
    private final CandidatureService candidatureService;
    private final JwtService jwtService;
    public AdminController(AdminService adminService, CandidatureService candidatureService, JwtService jwtService) {
        this.adminService = adminService;
        this.candidatureService = candidatureService;
        this.jwtService = jwtService;
    }
    

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request){
        try{
            Admin admin = adminService.login(request);
            String token = jwtService.generateToken(admin);
            return ResponseEntity.ok(AdminLoginResponse.from(admin, token));
        }
        catch(Exception e){
            return ResponseEntity.status(401).body("بيانات الدخول غير صحيحة");
        }
    }


    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboardStats() {
        return ResponseEntity.ok(candidatureService.getDashboardStats());
    }

    @PutMapping("/{id}/email")
    public ResponseEntity<?> updateEmail(
            @PathVariable String id,
            @Valid @RequestBody UpdateEmailRequest request,
            Authentication authentication) {
        if (!id.equals(authentication.getName())) {
            return ResponseEntity.status(403).build();
        }
        try {
            Admin updated = adminService.updateEmail(id, request.getEmail());
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}/password")
    public ResponseEntity<?> updatePassword(
            @PathVariable String id,
            @Valid @RequestBody UpdatePasswordRequest request,
            Authentication authentication) {
        if (!id.equals(authentication.getName())) {
            return ResponseEntity.status(403).build();
        }
        try {
            adminService.updatePassword(id, request.getCurrentPassword(), request.getNewPassword());
            return ResponseEntity.ok("تم تغيير كلمة المرور بنجاح");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
