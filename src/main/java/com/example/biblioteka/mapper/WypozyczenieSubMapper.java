package com.example.biblioteka.mapper;

import com.example.biblioteka.dto.WypozyczenieDTO;
import com.example.biblioteka.entity.Wypozyczenie;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper
public interface WypozyczenieSubMapper {
    @Mapping(target = "czytelnik", ignore = true)
    @Mapping(target = "ksiazka", ignore = true)
    WypozyczenieDTO wypozyczenieToWypozyczenieDTO(Wypozyczenie source);
    @Mapping(target = "czytelnik", ignore = true)
    @Mapping(target = "ksiazka", ignore = true)
    Wypozyczenie wypozyczenieDTOToWypozyczenie(WypozyczenieDTO destination);
    List<Wypozyczenie> wypozyczenieDTOListToWypozyczenieList(List<WypozyczenieDTO> dtos);
    List<WypozyczenieDTO> wypozyczenieListToWypozyczenieDTOList(List<Wypozyczenie> entities);
}