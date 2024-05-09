package com.example.biblioteka.repository;

import com.example.biblioteka.entity.Ksiazka;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface KsiazkaRepository extends JpaRepository<Ksiazka, Long> {
    List<Ksiazka> findByNazwaContainingIgnoreCase(String nazwa);
    List<Ksiazka> findByNazwaStartsWithIgnoreCase(String nazwa);
}
