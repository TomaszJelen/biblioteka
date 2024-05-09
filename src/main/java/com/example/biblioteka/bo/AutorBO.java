package com.example.biblioteka.bo;

import com.example.biblioteka.dto.AutorDTO;
import com.example.biblioteka.mapper.AutorMapper;
import com.example.biblioteka.repository.AutorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AutorBO {
    @Autowired
    private AutorRepository autorRepository;

    @Autowired
    private AutorMapper autorMapper;

    public Page<AutorDTO> getAutors(Pageable pageable) {
        return autorRepository.findAll(pageable).map(a -> autorMapper.autorToAutorDTO(a));
    }

    public AutorDTO addAutor(AutorDTO autor) {
        return autorMapper.autorToAutorDTO(autorRepository.save(autorMapper.autorDTOToAutor(autor)));
    }

    public void deleteAutor(AutorDTO autor) {
        autorRepository.delete(autorMapper.autorDTOToAutor(autor));
    }

    public void deleteAutorByID(Integer id) {
        autorRepository.deleteById(Long.valueOf(id));
    }

    public List<AutorDTO> findAutors(String input) {
        return autorMapper.autorListToAutorDTOList(autorRepository.findByImieNazwiskoStartsWithIgnoreCase(input));
    }

}
