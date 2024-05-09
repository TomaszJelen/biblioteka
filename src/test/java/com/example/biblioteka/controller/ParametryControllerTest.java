package com.example.biblioteka.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ParametryController.class)
class ParametryControllerTest {

    @Autowired
    private MockMvc mvc;
    @Test
    void getparametry() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                        .get("/restapi/parametry")
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.borrowTime").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.prolongTime").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.borrowTime").value(3));
    }
}