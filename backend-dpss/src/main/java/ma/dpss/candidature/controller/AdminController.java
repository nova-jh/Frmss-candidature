package ma.dpss.candidature.controller;

import ma.dpss.candidature.dto.LoginRequest;
import ma.dpss.candidature.model.Admin;
import ma.dpss.candidature.service.AdminService;
import ma.dpss.candidature.service.CandidatureService;
import ma.dpss.candidature.dto.UpdateEmailRequest;
import ma.dpss.candidature.dto.UpdatePasswordRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")

public class AdminController {
    private final AdminService adminService;
    private final CandidatureService candidatureService;
    public AdminController(AdminService adminService , CandidatureService candidatureService) {
        this.adminService = adminService;
        this.candidatureService = candidatureService;
    }
    

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request){
        try{
            Admin admin = adminService.login(request);
            return ResponseEntity.ok(admin);
        }
        catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboardStats() {
        return ResponseEntity.ok(candidatureService.getDashboardStats());
    }

    @PutMapping("/{id}/email")
    public ResponseEntity<?> updateEmail(@PathVariable String id, @RequestBody UpdateEmailRequest request) {
        try {
            Admin updated = adminService.updateEmail(id, request.getEmail());
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}/password")
    public ResponseEntity<?> updatePassword(@PathVariable String id, @RequestBody UpdatePasswordRequest request) {
        try {
            adminService.updatePassword(id, request.getCurrentPassword(), request.getNewPassword());
            return ResponseEntity.ok("ØªÙ… ØªØºÙŠÙŠØ± ÙƒÙ„Ù…Ø© Ø§Ù„Ù…Ø±ÙˆØ± Ø¨Ù†Ø¬Ø§Ø­");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}