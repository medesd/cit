package com.planning.api.main.ctrls;

import com.planning.api.main.services.Etu02Service;
import lombok.SneakyThrows;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.FileUtils;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.charset.StandardCharsets;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/etu02")
public class Etu02Ctrl {
    private final Etu02Service etu02Service;

    public Etu02Ctrl(Etu02Service etu02Service) {
        this.etu02Service = etu02Service;
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    @SneakyThrows
    public String generatePlanning(@RequestParam("file") MultipartFile file, @RequestParam("id") Long id, @RequestParam("lot") String lot) {
        File resource = etu02Service.generateChart(id, lot, file);
        byte[] encoded = Base64.encodeBase64(FileUtils.readFileToByteArray(resource));
        return new String(encoded, StandardCharsets.UTF_8);
    }
}
