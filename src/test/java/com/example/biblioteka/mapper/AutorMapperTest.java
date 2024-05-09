package com.example.biblioteka.mapper;

import com.example.biblioteka.dto.AutorDTO;
import com.example.biblioteka.dto.KsiazkaDTO;
import com.example.biblioteka.entity.Autor;
import com.example.biblioteka.entity.Ksiazka;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.ArrayList;
import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;

class AutorMapperTest {
    AutorMapper autorMapper = Mappers.getMapper(AutorMapper.class);
    KsiazkaSubMapper ksiazkaSubMapper = Mappers.getMapper(KsiazkaSubMapper.class);

    @BeforeEach
    public void init() {
        ReflectionTestUtils.setField(autorMapper, "ksiazkaSubMapper", ksiazkaSubMapper);
    }

    @Test
    void autorToAutorDTO() {
        Autor autor = Autor.builder().id(1).imie("Jan").nazwisko("Kowalski").ksiazki(Collections.<Ksiazka>emptyList()).build();
        AutorDTO autorDTO = AutorDTO.builder().id(1).imie("Jan").nazwisko("Kowalski").ksiazki(Collections.<KsiazkaDTO>emptyList()).build();
        AutorDTO autorDTOBeta = autorMapper.autorToAutorDTO(autor);
        assertEquals(autorDTO, autorDTOBeta, "Blad autorToAutorDTO");
    }

    @Test
    @Disabled("Not implemented yet")
    void autorDTOToAutor() {
    }

    @Test
    @Disabled("Not implemented yet")
    void autorDTOListToAutorList() {
    }

    @Test
    @Disabled("Not implemented yet")
    void autorListToAutorDTOList() {
    }
}