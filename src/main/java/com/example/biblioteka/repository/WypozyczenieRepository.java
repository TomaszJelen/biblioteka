package com.example.biblioteka.repository;

import com.example.biblioteka.entity.Wypozyczenie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface WypozyczenieRepository extends JpaRepository<Wypozyczenie, Long> {
    List<Wypozyczenie> findByToDateIsAndReturnDateNull(LocalDate przewidywanaMaksymalnaDataZwrotu);
}
