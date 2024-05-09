package com.example.biblioteka.bo;

import com.example.biblioteka.dto.KsiazkaDTO;
import com.example.biblioteka.mapper.KsiazkaMapper;
import com.example.biblioteka.repository.KsiazkaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KsiazkaBO {
    @Autowired
    private KsiazkaRepository ksiazkaRepository;

    @Autowired
    private KsiazkaMapper ksiazkaMapper;

    public Page<KsiazkaDTO> getKsiazkas(Pageable pageable) {
        return ksiazkaRepository.findAll(pageable).map(a -> ksiazkaMapper.ksiazkaToKsiazkaDTO(a));
    }

    public KsiazkaDTO addKsiazka(KsiazkaDTO ksiazka) {
        return ksiazkaMapper.ksiazkaToKsiazkaDTO(ksiazkaRepository.save(ksiazkaMapper.ksiazkaDTOToKsiazka(ksiazka)));
    }

    public void deleteKsiazka(KsiazkaDTO ksiazka) {
        ksiazkaRepository.delete(ksiazkaMapper.ksiazkaDTOToKsiazka(ksiazka));
    }

    public void deleteKsiazkaByID(Integer id) {
        ksiazkaRepository.deleteById(Long.valueOf(id));
    }

    public List<KsiazkaDTO> findKsiazkas(String input) {
        return ksiazkaMapper.ksiazkaListToKsiazkaDTOList(ksiazkaRepository.findByNazwaStartsWithIgnoreCase(input));

    }
}
