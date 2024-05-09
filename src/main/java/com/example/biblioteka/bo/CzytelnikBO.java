package com.example.biblioteka.bo;

import com.example.biblioteka.dto.CzytelnikDTO;
import com.example.biblioteka.mapper.CzytelnikMapper;
import com.example.biblioteka.repository.CzytelnikRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CzytelnikBO {
    @Autowired
    private CzytelnikRepository czytelnikRepository;

    @Autowired
    private CzytelnikMapper czytelnikMapper;

    public Page<CzytelnikDTO> getCzytelniks(Pageable pageable) {
        return czytelnikRepository.findAll(pageable).map(a -> czytelnikMapper.czytelnikToCzytelnikDTO(a));
    }

    public CzytelnikDTO addCzytelnik(CzytelnikDTO czytelnik) {
        return czytelnikMapper.czytelnikToCzytelnikDTO(czytelnikRepository.save(czytelnikMapper.czytelnikDTOToCzytelnik(czytelnik)));
    }

    public void deleteCzytelnik(CzytelnikDTO czytelnik) {
        czytelnikRepository.delete(czytelnikMapper.czytelnikDTOToCzytelnik(czytelnik));
    }

    public List<CzytelnikDTO> findCzytelniks(String input) {
        return czytelnikMapper.czytelnikListToCzytelnikDTOList(czytelnikRepository.findByImieNazwiskoStartsWithIgnoreCase(input));
    }
}
