package ma.dpss.candidature.service;

import ma.dpss.candidature.model.Candidature;
import ma.dpss.candidature.model.PalmaresSportif;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
public class ExcelExportService {

    private final ClassementService classementService;

    public ExcelExportService(ClassementService classementService) {
        this.classementService = classementService;
    }

    public byte[] exportClassement(String type) throws IOException {

        List<Candidature> candidats;

        switch (type) {

            case "national":

                candidats = classementService.classementParNational(
                        classementService.classementParMoyenne());

                break;

            case "international":

                candidats = classementService.classementParInternational(
                        classementService.classementParNational(
                                classementService.classementParMoyenne()));

                break;

            default:

                candidats = classementService.classementParMoyenne();

        }

        Workbook workbook = new XSSFWorkbook();

        Sheet sheet = workbook.createSheet("Classement");

        CellStyle titleStyle = workbook.createCellStyle();

        Font titleFont = workbook.createFont();

        titleFont.setBold(true);

        titleFont.setColor(IndexedColors.WHITE.getIndex());

        titleFont.setFontHeightInPoints((short)12);

        titleStyle.setFont(titleFont);

        titleStyle.setFillForegroundColor(
                IndexedColors.DARK_BLUE.getIndex());

        titleStyle.setFillPattern(
                FillPatternType.SOLID_FOREGROUND);

        titleStyle.setAlignment(HorizontalAlignment.CENTER);

        titleStyle.setVerticalAlignment(
                VerticalAlignment.CENTER);

        titleStyle.setBorderTop(BorderStyle.THIN);

        titleStyle.setBorderBottom(BorderStyle.THIN);

        titleStyle.setBorderLeft(BorderStyle.THIN);

        titleStyle.setBorderRight(BorderStyle.THIN);

        CellStyle cellStyle = workbook.createCellStyle();

        cellStyle.setBorderTop(BorderStyle.THIN);

        cellStyle.setBorderBottom(BorderStyle.THIN);

        cellStyle.setBorderLeft(BorderStyle.THIN);

        cellStyle.setBorderRight(BorderStyle.THIN);

        cellStyle.setVerticalAlignment(
                VerticalAlignment.TOP);

        cellStyle.setWrapText(true);

        Row header = sheet.createRow(0);
        
        String[] colonnes = {
            "Classement",
            "Nom complet",
            "Code Massar",
            "Date de naissance",
            "Lieu de naissance",
            "Téléphone",
            "Email",
            "Établissement",
            "Spécialité Bac",
            "Moyenne Bac",
            "Filière Sport-Études",
            "Université",
            "Nombre championnats nationaux",
            "Championnats nationaux",
            "Nombre championnats internationaux",
            "Championnats internationaux"
        };
        for(int i=0;i<colonnes.length;i++){
            Cell cell = header.createCell(i);
            cell.setCellValue(colonnes[i]);
            cell.setCellStyle(titleStyle);
        }
        int ligne = 1;
        int classement = 1;
        for(Candidature candidature : candidats){
            Row row = sheet.createRow(ligne++);
            int col = 0;
            Cell cell;
            cell = row.createCell(col++);
            cell.setCellValue(classement++);
            cell.setCellStyle(cellStyle);
            cell = row.createCell(col++);
            cell.setCellValue(
                candidature.getNomComplet()==null?"":candidature.getNomComplet());
            cell.setCellStyle(cellStyle);
            cell = row.createCell(col++);
            cell.setCellValue(
                candidature.getCodeMassar()==null?"":candidature.getCodeMassar());
            cell.setCellStyle(cellStyle);
            cell = row.createCell(col++);
            cell.setCellValue(
                candidature.getDateNaissance()==null? "": candidature.getDateNaissance().toString());
            cell.setCellStyle(cellStyle);
            cell = row.createCell(col++);
            cell.setCellValue(
                candidature.getLieuNaissance()==null? "": candidature.getLieuNaissance());
            cell.setCellStyle(cellStyle);
            cell = row.createCell(col++);
            cell.setCellValue(
                candidature.getTelephone()==null? "": candidature.getTelephone());
            cell.setCellStyle(cellStyle);
            cell = row.createCell(col++);
            cell.setCellValue(
                candidature.getEmail()==null? "": candidature.getEmail());
            cell.setCellStyle(cellStyle);
            cell = row.createCell(col++);
            cell.setCellValue( candidature.getEtablissement()==null? "": candidature.getEtablissement());
            cell.setCellStyle(cellStyle);
            cell = row.createCell(col++);
            cell.setCellValue( candidature.getSpecialiteBac()==null? "": candidature.getSpecialiteBac());
            cell.setCellStyle(cellStyle);
            cell = row.createCell(col++);
            cell.setCellValue(candidature.getMoyenneBac());
            cell.setCellStyle(cellStyle);
            cell = row.createCell(col++);
            cell.setCellValue( candidature.getFiliereSportEtude()==null? "": candidature.getFiliereSportEtude().name()); 
            cell.setCellStyle(cellStyle);

            cell = row.createCell(col++);
            cell.setCellValue(candidature.getEtablissementSup()==null? "": candidature.getEtablissementSup());
            cell.setCellStyle(cellStyle);

            

            // ==============================
            // Championnats nationaux
            // ==============================
            List<PalmaresSportif> nationaux =
            candidature.getChampionnatsNationaux();
            cell = row.createCell(col++);
            cell.setCellValue(
                nationaux == null ? 0 : nationaux.size());
            cell.setCellStyle(cellStyle);
            StringBuilder texteNationaux = new StringBuilder();
            if(nationaux != null){
                for(PalmaresSportif p : nationaux){
                    texteNationaux
                    .append("Saison : ")
                    .append(p.getSaison())
                    .append(" | Sport : ")
                    .append(p.getTypeSport())
                    .append(" | Rang : ")
                    .append(p.getRang())
                    .append(" | Lieu : ")
                    .append(p.getLieu())
                    .append("\n");
                }
            }
            cell = row.createCell(col++);
            cell.setCellValue(
                texteNationaux.toString());
            cell.setCellStyle(cellStyle);
        
             
            // ==============================
            // Championnats internationaux
            // ==============================
            
            List<PalmaresSportif> internationaux = candidature.getChampionnatsInternationaux();
            cell = row.createCell(col++);
            cell.setCellValue(
                internationaux == null ? 0 : internationaux.size());
            cell.setCellStyle(cellStyle);
            StringBuilder texteInternationaux = new StringBuilder();
            if(internationaux != null){
                for(PalmaresSportif p : internationaux){
                    texteInternationaux
                    .append("Saison : ")
                    .append(p.getSaison())
                    .append(" | Sport : ")
                    .append(p.getTypeSport())
                    .append(" | Rang : ")
                    .append(p.getRang())
                    .append(" | Lieu : ")
                    .append(p.getLieu())
                    .append("\n");
                }
            }
            cell = row.createCell(col++);
            cell.setCellValue(
                texteInternationaux.toString());
            cell.setCellStyle(cellStyle);
        }
           
        // Ajuster automatiquement la largeur des colonnes
        for (int i = 0; i < colonnes.length; i++) {
            sheet.autoSizeColumn(i);
            int largeur = sheet.getColumnWidth(i);
            if (largeur > 15000) {
                sheet.setColumnWidth(i, 15000);
            }
        }
            
        // Figer la première ligne
        sheet.createFreezePane(0,1);

        // Activer le filtre automatique
        sheet.setAutoFilter(
            new org.apache.poi.ss.util.CellRangeAddress(
                0,
                candidats.size(),
                0,
                colonnes.length-1
            )
        );
            
        // Export du fichier
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        workbook.close();
        return outputStream.toByteArray();
    }
    }
