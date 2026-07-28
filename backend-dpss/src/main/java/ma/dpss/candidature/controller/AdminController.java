package ma.dpss.candidature.controller;

import ma.dpss.candidature.dto.LoginRequest;
import ma.dpss.candidature.model.Admin;
import ma.dpss.candidature.service.AdminService;
import ma.dpss.candidature.service.CandidatureService;

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

}