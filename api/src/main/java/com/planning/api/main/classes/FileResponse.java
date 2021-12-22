package com.planning.api.main.classes;

import com.planning.api.main.models.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;
@Getter
@Setter
@ToString
public class FileResponse {
    private DataDTO data;
    private Resource resource;
}
