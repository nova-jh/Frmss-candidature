package ma.dpss.candidature.service;

import ma.dpss.candidature.model.Candidature;
import ma.dpss.candidature.model.PalmaresSportif;
import ma.dpss.candidature.repository.CandidatureRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class ClassementService {

    private final CandidatureRepository repository;

    public ClassementService(CandidatureRepository repository) {
        this.repository = repository;
    }

    /*
     * ===============================
     * ETAPE 1
     * Classement par moyenne
     * ===============================
     */

    public List<Candidature> classementParMoyenne(){

        List<Candidature> candidats =
                new ArrayList<>(repository.findAll());

        candidats.sort(

                Comparator.comparingDouble(
                        Candidature::getMoyenneBac
                ).reversed()

        );

        return candidats;

    }

    /*
     * ===============================
     * ETAPE 2
     * Meilleur rang national
     * ===============================
     */

    private int meilleurRangNational(Candidature candidature){

        if(candidature.getChampionnatsNationaux()==null
                || candidature.getChampionnatsNationaux().isEmpty()){

            return Integer.MAX_VALUE;

        }

        return candidature.getChampionnatsNationaux()

                .stream()

                .map(PalmaresSportif::getRang)

                .filter(r->r!=null)

                .min(Integer::compareTo)

                .orElse(Integer.MAX_VALUE);

    }

    /*
     * ===============================
     * ETAPE 3
     * Classement national
     * ===============================
     */

    public List<Candidature> classementParNational(
        List<Candidature> candidats){
            List<Candidature> resultat = new ArrayList<>(candidats);
            resultat.sort(
                Comparator.comparingInt(
                    this::meilleurRangNational
                )
            );
            return resultat;
    }

    /*
    * ===============================
    * ETAPE 4
    * Meilleur rang international
    * ===============================
    */
   
    private int meilleurRangInternational(Candidature candidature){
        if(candidature.getChampionnatsInternationaux()==null || candidature.getChampionnatsInternationaux().isEmpty()){
            return Integer.MAX_VALUE;
        }
        return candidature.getChampionnatsInternationaux().stream().map(PalmaresSportif::getRang).filter(r -> r != null).min(Integer::compareTo).orElse(Integer.MAX_VALUE);
    }
    /*
    * ===============================
    * ETAPE 5
    * Classement international
    * ===============================
    */
   
    public List<Candidature> classementParInternational(
        List<Candidature> candidats){
            List<Candidature> resultat = new ArrayList<>(candidats);
            resultat.sort(
                Comparator.comparingInt(
                    this::meilleurRangInternational
                )
            );
            return resultat;
        }
}