package com.example.biblioteka.bo;

import com.example.biblioteka.dto.WypozyczenieDTO;
import com.example.biblioteka.mapper.WypozyczenieMapper;
import com.example.biblioteka.repository.WypozyczenieRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class WypozyczenieBO {
    @Autowired
    private WypozyczenieRepository wypozyczenieRepository;

    @Autowired
    private WypozyczenieMapper wypozyczenieMapper;
    Logger logger = LoggerFactory.getLogger(getClass());

    public Page<WypozyczenieDTO> getWypozyczenies(Pageable pageable) {
        return wypozyczenieRepository.findAll(pageable).map(a -> wypozyczenieMapper.wypozyczenieToWypozyczenieDTO(a));
    }

    public WypozyczenieDTO addWypozyczenie(WypozyczenieDTO wypozyczenieDTO) {
        return wypozyczenieMapper.wypozyczenieToWypozyczenieDTO(wypozyczenieRepository.save(wypozyczenieMapper.wypozyczenieDTOToWypozyczenie(wypozyczenieDTO)));
    }

    public void deleteWypozyczenie(WypozyczenieDTO wypozyczenieDTO) {
        wypozyczenieRepository.delete(wypozyczenieMapper.wypozyczenieDTOToWypozyczenie(wypozyczenieDTO));
    }

    public List<WypozyczenieDTO> findWypozyczeniesOfDate(LocalDate input) {
        return wypozyczenieMapper.wypozyczenieListToWypozyczenieDTOList(wypozyczenieRepository.findByToDateIsAndReturnDateNull(input));
    }

    //TODO implementacja symulowania wysylania sms przypominajacych
    public void wyslijSms() {
        List<WypozyczenieDTO> tmp = findWypozyczeniesOfDate(LocalDate.now());
        logger.info(String.valueOf(LocalDate.now()));
        for (WypozyczenieDTO wyp : tmp)
        {
            logger.info(wyp.getCzytelnik().toString());
        }
        logger.info(tmp.toString());
    }
}
