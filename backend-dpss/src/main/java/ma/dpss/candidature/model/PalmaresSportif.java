package ma.dpss.candidature.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PalmaresSportif {
    private String saison;      // الموسم الدراسي (ex: 2024/2025)
    private String typeSport;   // النوع الرياضي
    private Integer rang;  // الرتبة المحصل عليها
    private String lieu;        // المكان
    
}
