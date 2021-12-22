package com.planning.api.main.services;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.planning.api.main.classes.DataDTO;
import com.planning.api.main.classes.FileResponse;
import com.planning.api.main.models.Data;
import com.planning.api.main.reps.FilesRep;
import com.planning.api.main.reps.ProjectRep;
import com.planning.api.utils.FileStorageProperties;
import lombok.SneakyThrows;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FileStorageService {

    private final Path fileStorageLocation;
    private final FilesRep filesRep;
    private final ProjectRep projectRep;
    private final ObjectMapper mapper;

    @Autowired
    public FileStorageService(FileStorageProperties fileStorageProperties, FilesRep filesRep, ProjectRep projectRep) {
        this.filesRep = filesRep;
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir()).toAbsolutePath().normalize();
        this.projectRep = projectRep;
        this.mapper = new ObjectMapper();
        this.mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    @SneakyThrows
    public DataDTO storeFile(MultipartFile file, Data data) {
        if (!projectRep.existsById(data.getProject().getId())) return null;

        data.setProject(projectRep.getById(data.getProject().getId()));

        // Normalize file name

        data.setFileName(file.getOriginalFilename());
        data.setFileType(file.getContentType());
        data.setSize(file.getSize());
        var data1 = filesRep.save(data);

        MultipartFile multipartFile = new MockMultipartFile(FilenameUtils.getBaseName(data1.getId()), file.getInputStream());


        // Check if the file's name contains invalid characters
        if (data1.getId().contains("..")) {
            throw new IOException("Sorry! Filename contains invalid path sequence " + data1.getId());
        }

        // Copy file to the target location (Replacing existing file with the same name)
        Path targetLocation = this.fileStorageLocation.resolve(data1.getId());

        Files.copy(multipartFile.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);


        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/files/downloadFile/")
                .path(data1.getId())
                .toUriString();
        data1.setFileDownloadUri(fileDownloadUri);
        filesRep.save(data1);
        return mapper.convertValue(data1, DataDTO.class);
    }

    public FileResponse loadFileAsResource(String fileName) {
        var data = new FileResponse();

        var d = filesRep.findById(fileName);
        if (d.isPresent()) {
            data.setData(mapper.convertValue(d.get(), DataDTO.class));
            System.out.println(d.get().toString());
            try {
                Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
                Resource resource = new UrlResource(filePath.toUri());
                if (resource.exists()) {
                    data.setResource(resource);
                    return data;
                } else {
                    throw new MalformedURLException("File not found " + fileName);
                }
            } catch (MalformedURLException ex) {
                ex.printStackTrace();
                return null;
            }
        } else return null;


    }

    public DataDTO getData(String id) {
        return mapper.convertValue(filesRep.getById(id), DataDTO.class);
    }

    public List<DataDTO> getDataByProject(Long id, String filter) {
        if (filter == null) filter = "";
        String finalFilter = filter;
        var p = projectRep.getById(id).getData().stream().filter(x -> x.toString().toLowerCase().contains(finalFilter.toLowerCase())).collect(Collectors.toList());
        return mapper.convertValue(p, new TypeReference<>() {
        });
    }


    public String deleteData(String id) {
        if (filesRep.existsById(id)) {

            File file = new File("files/" + id);
            file.delete();
            filesRep.deleteById(id);
            return id;
        } else return null;
    }
}
