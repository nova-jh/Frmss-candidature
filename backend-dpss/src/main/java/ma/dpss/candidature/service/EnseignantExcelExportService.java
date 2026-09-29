package ma.dpss.candidature.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

import ma.dpss.candidature.model.Enseignant;
import ma.dpss.candidature.model.ResultatEnseignant;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

@Service
public class EnseignantExcelExportService {

    private static final String[] HEADERS = {
            "الترتيب", "الاسم الكامل", "رقم التأجير", "الهاتف", "البريد الإلكتروني",
            "الإطار", "المؤسسة", "المديرية الإقليمية", "الأكاديمية",
            "الموسم", "الرياضة", "الرتبة", "المكان"
    };
    private static final int[] COLUMN_WIDTHS = {
            12, 26, 18, 18, 32, 22, 27, 27, 27, 18, 22, 12, 23
    };

    private final EnseignantService enseignantService;

    public EnseignantExcelExportService(EnseignantService enseignantService) {
        this.enseignantService = enseignantService;
    }

    public byte[] exporter() {
        try (XSSFWorkbook workbook = new XSSFWorkbook();
             ByteArrayOutputStream output = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Classement Enseignants");
            sheet.setRightToLeft(true);
            sheet.createFreezePane(0, 2);
            sheet.setFitToPage(true);
            sheet.getPrintSetup().setLandscape(true);
            sheet.getPrintSetup().setFitWidth((short) 1);
            sheet.getPrintSetup().setFitHeight((short) 0);
            sheet.setRepeatingRows(CellRangeAddress.valueOf("1:2"));

            CellStyle titleStyle = style(workbook, "FFFFFF", "123D62", true, false);
            CellStyle headerStyle = style(workbook, "FFFFFF", "1479A9", true, false);
            CellStyle groupStyle = style(workbook, "FFFFFF", "195780", true, false);
            CellStyle paleStyle = style(workbook, "183248", "EEF5FA", false, false);
            CellStyle paleLastStyle = style(workbook, "183248", "EEF5FA", false, true);
            CellStyle whiteStyle = style(workbook, "183248", "FFFFFF", false, false);
            CellStyle whiteLastStyle = style(workbook, "183248", "FFFFFF", false, true);

            Row title = sheet.createRow(0);
            title.setHeightInPoints(34);
            fillRow(title, titleStyle);
            title.getCell(0).setCellValue("تصنيف طلبات الأساتذة");
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, HEADERS.length - 1));

            Row header = sheet.createRow(1);
            header.setHeightInPoints(32);
            for (int column = 0; column < HEADERS.length; column++) {
                header.createCell(column).setCellValue(HEADERS[column]);
                header.getCell(column).setCellStyle(headerStyle);
                sheet.setColumnWidth(column, COLUMN_WIDTHS[column] * 256);
            }

            int rowIndex = 2;
            int classement = 1;
            for (Enseignant enseignant : enseignantService.getClassement()) {
                Row group = sheet.createRow(rowIndex++);
                group.setHeightInPoints(28);
                fillRow(group, groupStyle);
                group.getCell(0).setCellValue(
                        "الأستاذ " + classement + " — " + safe(enseignant.getNomComplet()));
                sheet.addMergedRegion(new CellRangeAddress(group.getRowNum(), group.getRowNum(),
                        0, HEADERS.length - 1));

                List<ResultatEnseignant> resultats = enseignant.getResultats();
                int count = resultats == null || resultats.isEmpty() ? 1 : resultats.size();
                for (int resultIndex = 0; resultIndex < count; resultIndex++) {
                    Row row = sheet.createRow(rowIndex++);
                    row.setHeightInPoints(27);
                    boolean last = resultIndex == count - 1;
                    CellStyle detailStyle = classement % 2 == 1
                            ? (last ? paleLastStyle : paleStyle)
                            : (last ? whiteLastStyle : whiteStyle);
                    fillRow(row, detailStyle);
                    if (resultIndex == 0) {
                        fillTeacher(row, enseignant, classement);
                    }
                    if (resultats != null && !resultats.isEmpty()) {
                        fillResult(row, resultats.get(resultIndex));
                    }
                }
                classement++;
            }

            workbook.write(output);
            return output.toByteArray();
        } catch (IOException exception) {
            throw new IllegalStateException("Impossible de générer l'export des enseignants", exception);
        }
    }

    private static void fillTeacher(Row row, Enseignant enseignant, int classement) {
        row.getCell(0).setCellValue(classement);
        row.getCell(1).setCellValue(safe(enseignant.getNomComplet()));
        row.getCell(2).setCellValue(safe(enseignant.getNumeroPpr()));
        row.getCell(3).setCellValue(safe(enseignant.getTelephone()));
        row.getCell(4).setCellValue(safe(enseignant.getEmail()));
        row.getCell(5).setCellValue(safe(enseignant.getCadre()));
        row.getCell(6).setCellValue(safe(enseignant.getEtablissement()));
        row.getCell(7).setCellValue(safe(enseignant.getDirectionProvinciale()));
        row.getCell(8).setCellValue(safe(enseignant.getAcademie()));
    }

    private static void fillResult(Row row, ResultatEnseignant resultat) {
        if (resultat == null) {
            return;
        }
        row.getCell(9).setCellValue(safe(resultat.getSaison()));
        row.getCell(10).setCellValue(safe(resultat.getSport()));
        row.getCell(11).setCellValue(safe(resultat.getClassement()));
        row.getCell(12).setCellValue(safe(resultat.getLieu()));
    }

    private static void fillRow(Row row, CellStyle style) {
        for (int column = 0; column < HEADERS.length; column++) {
            row.createCell(column).setCellStyle(style);
        }
    }

    private static CellStyle style(XSSFWorkbook workbook, String textColor,
                                   String backgroundColor, boolean bold, boolean groupEnd) {
        XSSFCellStyle style = workbook.createCellStyle();
        style.setFillForegroundColor(color(backgroundColor));
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        style.setAlignment(HorizontalAlignment.CENTER);
        style.setVerticalAlignment(VerticalAlignment.CENTER);
        style.setWrapText(true);
        style.setBorderBottom(groupEnd ? BorderStyle.MEDIUM : BorderStyle.THIN);
        style.setBottomBorderColor(IndexedColors.GREY_50_PERCENT.getIndex());
        style.setBorderLeft(BorderStyle.THIN);
        style.setBorderRight(BorderStyle.THIN);
        style.setLeftBorderColor(IndexedColors.GREY_25_PERCENT.getIndex());
        style.setRightBorderColor(IndexedColors.GREY_25_PERCENT.getIndex());

        XSSFFont font = workbook.createFont();
        font.setFontName("Arial");
        font.setFontHeightInPoints((short) (bold ? 12 : 11));
        font.setBold(bold);
        font.setColor(color(textColor));
        style.setFont(font);
        return style;
    }

    private static XSSFColor color(String hex) {
        return new XSSFColor(new byte[] {
                (byte) Integer.parseInt(hex.substring(0, 2), 16),
                (byte) Integer.parseInt(hex.substring(2, 4), 16),
                (byte) Integer.parseInt(hex.substring(4, 6), 16)
        });
    }

    private static String safe(String value) {
        return value == null ? "" : value;
    }
}
