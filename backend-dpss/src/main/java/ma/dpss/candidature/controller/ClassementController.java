package ma.dpss.candidature.controller;

import ma.dpss.candidature.model.Candidature;
import ma.dpss.candidature.service.ClassementService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/classement")
@CrossOrigin(origins = "http://localhost:5173")
public class ClassementController {

    private final ClassementService classementService;

    public ClassementController(ClassementService classementService) {
        this.classementService = classementService;
    }

    @GetMapping("/moyenne")
    public List<Candidature> classementParMoyenne() {

        return classementService.classementParMoyenne();

    }

    @GetMapping("/national")
    public List<Candidature> classementNational(){
        List<Candidature> liste = classementService.classementParMoyenne();
        return classementService.classementParNational(liste);
    }
    @GetMapping("/international")
    public List<Candidature> classementInternational(){
        List<Candidature> liste = classementService.classementParMoyenne();
        liste = classementService.classementParNational(liste);
        return classementService.classementParInternational(liste);
    }

}