package com.example.biblioteka.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
@RequestMapping("/restapi/parametry")
public class ParametryController {
    @Value("${borrow-Time}")
    private Integer borrowTime;
    @Value("${prolong-Time}")
    private Integer prolongTime;

//  Przyklad:  http://localhost:8080/restapi/parametry
    @GetMapping
    public Map<String, Integer> getparametry() {
        Map<String, Integer> ret = new HashMap<>();
        ret.put("borrowTime",borrowTime);
        ret.put("prolongTime",prolongTime);
        return ret;
    }
}
