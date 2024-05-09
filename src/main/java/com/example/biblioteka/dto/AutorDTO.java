package com.example.biblioteka.dto;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
@EqualsAndHashCode
public class AutorDTO {
    private Integer id;
    private String imie;
    private String nazwisko;
    private List<KsiazkaDTO> ksiazki;
}