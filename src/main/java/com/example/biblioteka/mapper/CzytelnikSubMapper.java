package com.example.biblioteka.mapper;

import com.example.biblioteka.dto.CzytelnikDTO;
import com.example.biblioteka.entity.Czytelnik;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper
public interface CzytelnikSubMapper {
    @Mapping(target = "wypozyczenia", ignore = true)
    CzytelnikDTO czytelnikToCzytelnikDTO(Czytelnik source);
    @Mapping(target = "wypozyczenia", ignore = true)
    Czytelnik czytelnikDTOToCzytelnik(CzytelnikDTO destination);
    List<Czytelnik> czytelnikDTOListToCzytelnikList(List<CzytelnikDTO> dtos);
    List<CzytelnikDTO> czytelnikListToCzytelnikDTOList(List<Czytelnik> entities);
}