package com.example.biblioteka.dto;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@EqualsAndHashCode
public class KsiazkaDTO {
    private Integer id;
    private String nazwa;
    private List<AutorDTO> autorzy;
    private List<WypozyczenieDTO> wypozyczenia;
}