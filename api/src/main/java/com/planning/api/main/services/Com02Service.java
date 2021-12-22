package com.planning.api.main.services;

import com.planning.api.main.models.Com02;
import com.planning.api.main.reps.Com02Rep;
import org.springframework.stereotype.Service;

@Service
public class Com02Service {
    private final Com02Rep com02Rep;

    public Com02Service(Com02Rep com02Rep) {
        this.com02Rep = com02Rep;
    }

    public void save(Com02 com02) {
        com02Rep.save(com02);
    }
}
