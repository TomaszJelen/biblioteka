package com.example.biblioteka.controller;

import com.example.biblioteka.bo.WypozyczenieBO;
import com.example.biblioteka.dto.WypozyczenieDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
@RequestMapping("/restapi/wypozyczenie")
public class WypozyczenieController {
    @Autowired
    private WypozyczenieBO wypozyczenieBO;

//  Przyklad:  http://localhost:8080/restapi/rezerwacja?page=0&size=3&sort=id,DESC&sort=imie,ASC
    @GetMapping
    public Page<WypozyczenieDTO> getWypozyczenies(@SortDefault(sort = "id") @PageableDefault(size = 20) final Pageable pageable) {
        return wypozyczenieBO.getWypozyczenies(pageable);
    }


    @PostMapping
    public WypozyczenieDTO addWypozyczenie(@RequestBody WypozyczenieDTO wypozyczenie) {
        return wypozyczenieBO.addWypozyczenie(wypozyczenie);
    }

    @DeleteMapping
    public ResponseEntity<String> deleteWypozyczenie(@RequestBody WypozyczenieDTO wypozyczenie) {
        System.out.println("Kasowanie");
        wypozyczenieBO.deleteWypozyczenie(wypozyczenie);
        return ResponseEntity.ok().build();
    }
}
