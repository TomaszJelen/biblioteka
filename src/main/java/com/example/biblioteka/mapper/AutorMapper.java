package com.example.biblioteka.mapper;

import com.example.biblioteka.dto.AutorDTO;
import com.example.biblioteka.entity.Autor;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(uses = KsiazkaSubMapper.class)
public interface AutorMapper {
    AutorDTO autorToAutorDTO(Autor entity);
    Autor autorDTOToAutor(AutorDTO dto);
    List<Autor> autorDTOListToAutorList(List<AutorDTO> dtos);
    List<AutorDTO> autorListToAutorDTOList(List<Autor> entities);
}