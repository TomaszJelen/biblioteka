package com.example.biblioteka.repository;

import com.example.biblioteka.entity.Autor;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
//@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class AutorRepositoryTest {
    @Autowired
    private AutorRepository autorRepository;

    @Test
    @Disabled("Not implemented yet")
    void findByImieStartsWithIgnoreCase() {
    }

    @Test
    void findByImieNazwiskoStartsWithIgnoreCase() {
        List<Autor> autors = autorRepository.findByImieNazwiskoStartsWithIgnoreCase("ad");
        assertNotNull(autors);
        assertEquals(0, autors.size());
    }
}