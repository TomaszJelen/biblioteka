package com.example.biblioteka.repository;

import com.example.biblioteka.entity.Czytelnik;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CzytelnikRepository extends JpaRepository<Czytelnik, Long> {
    @Query("select a from Czytelnik a where UPPER(CONCAT(a.imie, ' ', a.nazwisko)) like UPPER(CONCAT(?1, '%'))")
    List<Czytelnik> findByImieNazwiskoStartsWithIgnoreCase(String input);
}