package com.example.biblioteka.mapper;

import com.example.biblioteka.dto.KsiazkaDTO;
import com.example.biblioteka.entity.Ksiazka;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(uses = {AutorSubMapper.class, WypozyczenieSubMapper.class})
public interface KsiazkaMapper {
    KsiazkaDTO ksiazkaToKsiazkaDTO(Ksiazka source);
    Ksiazka ksiazkaDTOToKsiazka(KsiazkaDTO destination);
    List<Ksiazka> ksiazkaDTOListToKsiazkaList(List<KsiazkaDTO> dtos);
    List<KsiazkaDTO> ksiazkaListToKsiazkaDTOList(List<Ksiazka> entities);
}