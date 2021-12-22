package com.planning.api.main.ctrls;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.planning.api.main.classes.DataDTO;
import com.planning.api.main.classes.FileResponse;
import com.planning.api.main.models.Data;
import com.planning.api.main.services.FileStorageService;
import lombok.SneakyThrows;
import org.apache.commons.codec.binary.Base64;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping(path = "/files/")
public class FileController {
    public static final String[] FILE_TYPES = new String[]{"xls", "xlsx"};
    private static final String NEW_LINE = "\n";
    private static final String HTML_FILE_EXTENSION = ".html";
    private static final String TEMP_FILE_EXTENSION = ".tmp";
    private static final String HTML_SNIPPET_1 = "<!DOCTYPE html><html><head><title>";
    private static final String HTML_SNIPPET_2 = "</title><style>body{margin:auto;text-align:center}.fl-table {width:100%;border-radius: 5px;font-size: 12px;font-weight: normal;border: 1px solid black;border-collapse: collapse;max-width: 100%;white-space: nowrap;background-color: white;}" +
            ".fl-table td, .fl-table th {text-align: center;border: 1px solid black;padding: 8px;}" +
            ".fl-table td {border-right: 1px solid #f8f8f8;font-size: 12px;border: 1px solid black;}" +
            ".fl-table th {color: #000;background: #4FC3A1;}" +
            ".fl-table th:nth-child(odd) {color: #fff;background: #324960;}</style></head><body><table class='fl-table'>";
    private static final String HTML_SNIPPET_3 = "</table></body></html>";
    private static final String HTML_TR_S = "<tr>";
    private static final String HTML_TR_E = "</tr>";
    private static final String HTML_TD_S = "<td>";
    private static final String HTML_TD_E = "</td>";
    private static final String HTML_TH_S = "<th>";
    private static final String HTML_TH_E = "</th>";


    private final FileStorageService fileStorageService;

    @Autowired
    public FileController(FileStorageService fileStorageService) {
        this.fileStorageService = fileStorageService;
    }

    @PostMapping("uploadFile")
    @PreAuthorize("hasRole('USER')")
    @SneakyThrows
    public DataDTO uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("data") String data) {
        var d = new ObjectMapper().readValue(data, Data.class);
        d.setEntryDate(new Date());
        return fileStorageService.storeFile(file, d);
    }

    @GetMapping("get-data/{id}")
    @PreAuthorize("hasRole('USER')")
    public DataDTO getData(@PathVariable("id") String id) {
        return fileStorageService.getData(id);
    }

    @GetMapping("data-by-project/{id}")
    @PreAuthorize("hasRole('USER')")
    public List<DataDTO> getDataByProject(@PathVariable("id") Long id, @RequestParam(name = "filter", required = false) String filter) {
        return fileStorageService.getDataByProject(id,filter);
    }

    @DeleteMapping("delete-data/{id}")
    @PreAuthorize("hasRole('USER')")
    public String deleteData(@PathVariable("id") String id) {
        return fileStorageService.deleteData(id);
    }


    @GetMapping("downloadFile/{id}")
    @SneakyThrows
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<String> downloadFile(@PathVariable("id") String fileName) {
        FileResponse resource = fileStorageService.loadFileAsResource(fileName);

        String imageStr = null;

        switch (resource.getData().getFileType()) {
            case "application/pdf":
                InputStream finput = new FileInputStream(resource.getResource().getFile());
                byte[] imageBytes = new byte[(int) resource.getResource().getFile().length()];
                finput.read(imageBytes, 0, imageBytes.length);
                finput.close();
                imageStr = "data:application/pdf;base64," + Base64.encodeBase64String(imageBytes);
                break;
            case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
            case "application/vnd.ms-excel":
                var file = resource.getResource().getFile();
                BufferedWriter writer;
                Workbook workbook;
                fileName = file.getName();
                String folderName = file.getParent();
                if (resource.getData().getFileType().equals("application/vnd.ms-excel")) {
                    workbook = new HSSFWorkbook(new FileInputStream(file));
                } else {
                    workbook = new XSSFWorkbook(new FileInputStream(file));
                }

                File tempFile = File.createTempFile(fileName + '-', HTML_FILE_EXTENSION
                        + TEMP_FILE_EXTENSION, new File(folderName));
                writer = new BufferedWriter(new FileWriter(tempFile));
                writer.write(HTML_SNIPPET_1);
                writer.write(fileName);
                writer.write(HTML_SNIPPET_2);
                Sheet sheet = workbook.getSheetAt(0);
                Iterator<Row> rows = sheet.rowIterator();
                Iterator<Cell> cells = null;
                var cpt = true;
                while (rows.hasNext()) {
                    Row row = rows.next();
                    cells = row.cellIterator();
                    writer.write(NEW_LINE);
                    writer.write(HTML_TR_S);
                    if (!cpt) {
                        while (cells.hasNext()) {
                            Cell cell = cells.next();
                            writer.write(HTML_TD_S);
                            writer.write(cell.toString());
                            writer.write(HTML_TD_E);
                        }
                    } else {
                        while (cells.hasNext()) {
                            Cell cell = cells.next();
                            writer.write(HTML_TH_S);
                            writer.write(cell.toString());
                            writer.write(HTML_TH_E);
                        }
                    }
                    writer.write(HTML_TR_E);
                    cpt = false;

                }
                writer.write(NEW_LINE);
                writer.write(HTML_SNIPPET_3);
                writer.close();
                finput = new FileInputStream(tempFile);
                byte[] image = new byte[(int) tempFile.length()];
                finput.read(image, 0, image.length);
                finput.close();
                imageStr = "data:text/html;base64," + Base64.encodeBase64String(image);
                tempFile.delete();
                break;
            case "application/msword":

                Process p = Runtime.getRuntime().exec("python script.py files/" + resource.getData().getId() + ".doc");
                p.waitFor();

                file = new File("files/" + resource.getData().getId() + ".pdf");

                finput = new FileInputStream(file);
                imageBytes = new byte[(int) file.length()];
                finput.read(imageBytes, 0, imageBytes.length);
                finput.close();
                imageStr = "data:application/pdf;base64," + Base64.encodeBase64String(imageBytes);
                file.delete();
                break;

            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                p = Runtime.getRuntime().exec("python script.py files/" + resource.getData().getId() + ".docx");
                p.waitFor();

                file = new File("files/" + resource.getData().getId() + ".pdf");

                finput = new FileInputStream(file);
                imageBytes = new byte[(int) file.length()];
                finput.read(imageBytes, 0, imageBytes.length);
                finput.close();
                imageStr = "data:application/pdf;base64," + Base64.encodeBase64String(imageBytes);
                file.delete();
                break;
            default:
                break;
        }
        return ResponseEntity.ok().body(imageStr);
    }


    @GetMapping("getFile/{id}")
    @SneakyThrows
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Resource> getFile(@PathVariable("id") String fileName) {
        FileResponse resource = fileStorageService.loadFileAsResource(fileName);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(resource.getData().getFileType()))
                .contentLength(resource.getResource().contentLength())
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getResource().getFilename() + "\"")
                .body(resource.getResource());
    }
}
