package com.example.biblioteka.repository;

import com.example.biblioteka.entity.Autor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AutorRepository extends JpaRepository<Autor, Long> {
    List<Autor> findByImieStartsWithIgnoreCase(String name);
    @Query("select a from Autor a where UPPER(CONCAT(a.imie, ' ', a.nazwisko)) like UPPER(CONCAT(?1, '%'))")
    List<Autor> findByImieNazwiskoStartsWithIgnoreCase(String input);
}
