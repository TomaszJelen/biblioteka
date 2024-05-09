package com.example.biblioteka.mapper;

import com.example.biblioteka.dto.CzytelnikDTO;
import com.example.biblioteka.entity.Czytelnik;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(uses = WypozyczenieSubMapper.class)
public interface CzytelnikMapper {
    CzytelnikDTO czytelnikToCzytelnikDTO(Czytelnik source);
    Czytelnik czytelnikDTOToCzytelnik(CzytelnikDTO destination);
    List<Czytelnik> czytelnikDTOListToCzytelnikList(List<CzytelnikDTO> dtos);
    List<CzytelnikDTO> czytelnikListToCzytelnikDTOList(List<Czytelnik> entities);
}