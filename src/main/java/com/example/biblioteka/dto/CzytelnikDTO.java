package com.example.biblioteka.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CzytelnikDTO {
    private Integer id;
    private String imie;
    private String nazwisko;
    private List<WypozyczenieDTO> wypozyczenia;
}