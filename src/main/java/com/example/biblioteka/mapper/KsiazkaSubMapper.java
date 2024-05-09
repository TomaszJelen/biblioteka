package com.example.biblioteka.mapper;

import com.example.biblioteka.dto.KsiazkaDTO;
import com.example.biblioteka.entity.Ksiazka;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper
public interface KsiazkaSubMapper {
    @Mapping(target = "autorzy", ignore = true)
    @Mapping(target = "wypozyczenia", ignore = true)
    KsiazkaDTO ksiazkaToKsiazkaDTO(Ksiazka source);
    @Mapping(target = "autorzy", ignore = true)
    @Mapping(target = "wypozyczenia", ignore = true)
    Ksiazka ksiazkaDTOToKsiazka(KsiazkaDTO destination);
    List<Ksiazka> ksiazkaDTOListToKsiazkaList(List<KsiazkaDTO> dtos);
    List<KsiazkaDTO> ksiazkaListToKsiazkaDTOList(List<Ksiazka> entities);
}