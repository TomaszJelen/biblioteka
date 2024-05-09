package com.example.biblioteka.controller;

import com.example.biblioteka.bo.AutorBO;
import com.example.biblioteka.dto.AutorDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/restapi/autor")
public class AutorController {

    @Autowired
    private AutorBO autorBO;

//  Przyklad:  http://localhost:8080/restapi/autor?page=0&size=3&sort=id,DESC&sort=imie,ASC
    @GetMapping
    public Page<AutorDTO> getAutors(@SortDefault(sort = "id") @PageableDefault(size = 20) final Pageable pageable) {
        return autorBO.getAutors(pageable);
    }

//  Przyklad: http://localhost:8080/restapi/autor/find?q=A
    @GetMapping("/find")
    public List<AutorDTO> findAutors(@RequestParam("q") String input) {
        return autorBO.findAutors(input);
    }


    @PostMapping
    public AutorDTO addAutor(@RequestBody AutorDTO autor) {
        return autorBO.addAutor(autor);
    }

    @DeleteMapping
    public ResponseEntity<String> deleteAutor(@RequestBody AutorDTO autor) {
        System.out.println("Kasowanie");
        autorBO.deleteAutor(autor);
        return ResponseEntity.ok().build();
    }
}
