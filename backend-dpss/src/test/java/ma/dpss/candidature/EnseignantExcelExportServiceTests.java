package ma.dpss.candidature;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.io.ByteArrayInputStream;
import java.util.List;

import ma.dpss.candidature.model.Enseignant;
import ma.dpss.candidature.model.ResultatEnseignant;
import ma.dpss.candidature.service.EnseignantExcelExportService;
import ma.dpss.candidature.service.EnseignantService;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.junit.jupiter.api.Test;

class EnseignantExcelExportServiceTests {

    @Test
    void separatesTeachersAndKeepsTheirResultsInTheirOwnGroups() throws Exception {
        Enseignant first = teacher("Premier", List.of(result("2025-2026"),
                result("2024-2025"), result("2023-2024")));
        Enseignant second = teacher("Deuxième", List.of(result("2025-2026")));
        EnseignantService service = mock(EnseignantService.class);
        when(service.getClassement()).thenReturn(List.of(first, second));

        byte[] bytes = new EnseignantExcelExportService(service).exporter();

        try (XSSFWorkbook workbook = new XSSFWorkbook(new ByteArrayInputStream(bytes))) {
            Sheet sheet = workbook.getSheetAt(0);
            assertEquals("الأستاذ 1 — Premier", sheet.getRow(2).getCell(0).getStringCellValue());
            assertEquals("2025-2026", sheet.getRow(3).getCell(9).getStringCellValue());
            assertEquals("2024-2025", sheet.getRow(4).getCell(9).getStringCellValue());
            assertEquals("2023-2024", sheet.getRow(5).getCell(9).getStringCellValue());
            assertEquals(BorderStyle.MEDIUM, sheet.getRow(5).getCell(9).getCellStyle().getBorderBottom());
            assertEquals("الأستاذ 2 — Deuxième", sheet.getRow(6).getCell(0).getStringCellValue());
            assertEquals("Deuxième", sheet.getRow(7).getCell(1).getStringCellValue());
            assertEquals(7, sheet.getLastRowNum());
            assertTrue(sheet.getNumMergedRegions() >= 3);
        }
    }

    private static Enseignant teacher(String name, List<ResultatEnseignant> results) {
        Enseignant teacher = new Enseignant();
        teacher.setNomComplet(name);
        teacher.setResultats(results);
        return teacher;
    }

    private static ResultatEnseignant result(String season) {
        ResultatEnseignant result = new ResultatEnseignant();
        result.setSaison(season);
        return result;
    }
}
