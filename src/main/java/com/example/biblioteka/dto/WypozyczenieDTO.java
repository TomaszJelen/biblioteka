package com.example.biblioteka.dto;

import com.example.biblioteka.deserializer.LocalDateTimeDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class WypozyczenieDTO {
    private Integer id;
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime fromDate;
    private LocalDate toDate;
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime returnDate;
    private CzytelnikDTO czytelnik;
    private KsiazkaDTO ksiazka;
}