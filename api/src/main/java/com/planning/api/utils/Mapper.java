package com.planning.api.utils;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import java.util.List;
import java.util.Map;

public class Mapper {
    private final ObjectMapper mapper;

    public Mapper() {
        this.mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
    }

    public Map<String, Object> convertOneValue(Object o) {
        return mapper.convertValue(o, new TypeReference<>() {
        });
    }

    public List<Map<String, Object>> convertListValue(Object o) {
        return mapper.convertValue(o, new TypeReference<>() {
        });
    }


    public <T> T convertValue(Object fromValue) {
        return mapper.convertValue(fromValue, new TypeReference<>() {});
    }
}
