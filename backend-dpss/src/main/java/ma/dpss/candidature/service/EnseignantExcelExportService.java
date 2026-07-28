package ma.dpss.candidature.service;

import ma.dpss.candidature.model.Enseignant;
import ma.dpss.candidature.model.ResultatEnseignant;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
public class EnseignantExcelExportService {

    private final EnseignantService enseignantService;

    public EnseignantExcelExportService(EnseignantService enseignantService) {

        this.enseignantService = enseignantService;

    }

    public byte[] exporter() {

        try {

            Workbook workbook = new XSSFWorkbook();

            Sheet sheet = workbook.createSheet("Classement Enseignants");

            int rowIndex = 0;

            Row header = sheet.createRow(rowIndex++);

            int c = 0;

            header.createCell(c++).setCellValue("الترتيب");
            header.createCell(c++).setCellValue("الاسم الكامل");
            header.createCell(c++).setCellValue("رقم التأجير");
            header.createCell(c++).setCellValue("الهاتف");
            header.createCell(c++).setCellValue("البريد الإلكتروني");
            header.createCell(c++).setCellValue("الإطار");
            header.createCell(c++).setCellValue("المؤسسة");
            header.createCell(c++).setCellValue("المديرية الإقليمية");
            header.createCell(c++).setCellValue("الأكاديمية");
            header.createCell(c++).setCellValue("الموسم");
            header.createCell(c++).setCellValue("الرياضة");
            header.createCell(c++).setCellValue("الرتبة");
            header.createCell(c++).setCellValue("المكان");

            List<Enseignant> enseignants = enseignantService.getClassement();

            int classement = 1;

            for (Enseignant enseignant : enseignants) {

                if (enseignant.getResultats() == null ||
                        enseignant.getResultats().isEmpty()) {

                    Row row = sheet.createRow(rowIndex++);

                    remplirInformationsGenerales(

                            row,

                            enseignant,

                            classement++

                    );

                    continue;

                }

                boolean premier = true;

                for (ResultatEnseignant resultat : enseignant.getResultats()) {

                    Row row = sheet.createRow(rowIndex++);

                    if (premier) {

                        remplirInformationsGenerales(

                                row,

                                enseignant,

                                classement++

                        );

                        premier = false;

                    }

                    row.createCell(9).setCellValue(resultat.getSaison());
                    row.createCell(10).setCellValue(resultat.getSport());
                    row.createCell(11).setCellValue(resultat.getClassement());
                    row.createCell(12).setCellValue(resultat.getLieu());

                }

            }

            for (int i = 0; i < 13; i++) {

                sheet.autoSizeColumn(i);

            }

            ByteArrayOutputStream out = new ByteArrayOutputStream();

            workbook.write(out);

            workbook.close();

            return out.toByteArray();

        }

        catch (Exception e) {

            throw new RuntimeException(e);

        }

    }

    private void remplirInformationsGenerales(

            Row row,

            Enseignant e,

            int classement

    ) {

        row.createCell(0).setCellValue(classement);

        row.createCell(1).setCellValue(e.getNomComplet());

        row.createCell(2).setCellValue(e.getNumeroPpr());

        row.createCell(3).setCellValue(e.getTelephone());

        row.createCell(4).setCellValue(e.getEmail());

        row.createCell(5).setCellValue(e.getCadre());

        row.createCell(6).setCellValue(e.getEtablissement());

        row.createCell(7).setCellValue(e.getDirectionProvinciale());

        row.createCell(8).setCellValue(e.getAcademie());

    }

}