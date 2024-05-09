package com.example.biblioteka.mapper;

import com.example.biblioteka.dto.WypozyczenieDTO;
import com.example.biblioteka.entity.Wypozyczenie;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(uses = {CzytelnikSubMapper.class, KsiazkaSubMapper.class})
public interface WypozyczenieMapper {
    WypozyczenieDTO wypozyczenieToWypozyczenieDTO(Wypozyczenie source);
    Wypozyczenie wypozyczenieDTOToWypozyczenie(WypozyczenieDTO destination);
    List<Wypozyczenie> wypozyczenieDTOListToWypozyczenieList(List<WypozyczenieDTO> dtos);
    List<WypozyczenieDTO> wypozyczenieListToWypozyczenieDTOList(List<Wypozyczenie> entities);
}