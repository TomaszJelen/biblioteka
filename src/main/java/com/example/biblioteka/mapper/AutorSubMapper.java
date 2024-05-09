package com.example.biblioteka.mapper;

import com.example.biblioteka.dto.AutorDTO;
import com.example.biblioteka.entity.Autor;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper
public interface AutorSubMapper {
    @Mapping(target = "ksiazki", ignore = true)
    AutorDTO autorToAutorDTO(Autor entity);
    @Mapping(target = "ksiazki", ignore = true)
    Autor autorDTOToAutor(AutorDTO dto);
    List<Autor> autorDTOListToAutorList(List<AutorDTO> dtos);
    List<AutorDTO> autorListToAutorDTOList(List<Autor> entities);
}