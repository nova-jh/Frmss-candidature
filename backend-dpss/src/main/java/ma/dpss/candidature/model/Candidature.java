package ma.dpss.candidature.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Email;

@Document(collection = "candidatures_etudiants")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Candidature {

    @Id
    private String id;

    // --- 1. معلومات عامة (Informations Générales) ---
    @NotBlank
    private String nomComplet;          // الاسم والنسب

    @NotBlank
    private String codeMassar;          // رقم مسار

    private LocalDate dateNaissance;    // تاريخ الازدياد
    private String lieuNaissance;        //مكان الازدياد

    @NotBlank
    private String telephone;           // رقم الهاتف

    @Email
    private String email;               // البريد الإلكتروني

    private String etablissement;       // المؤسسة

    // --- 2. معلومات حول المسار الدراسي (Cursus Académique) ---
    private String specialiteBac;       // تخصص الباكالوريا المحصل عليها
    private double moyenneBac;          // المعدل العام في الباكالوريا
    private TypeFiliere filiereSportEtude;   // المسار التعليمي (عام / مسار رياضة ودراسة)
    private String etablissementSup;    // المؤسسة الجامعية التي تم التسجيل فيها

    // --- 3. الإنجازات والبطولات الرياضية (Palmarès Sportif) ---
    // Ces listes vont stocker directement les lignes des tableaux du formulaire !
    private List<PalmaresSportif> championnatsInternationaux; // البطولات القارية والدولية
    private List<PalmaresSportif> championnatsNationaux;      // البطولات الوطنية

    // --- Métadonnées de gestion ---
    private StatutCandidature statut;              // "EN_ATTENTE", "VALIDE", "REJETE"
    private LocalDateTime dateSoumission;
}