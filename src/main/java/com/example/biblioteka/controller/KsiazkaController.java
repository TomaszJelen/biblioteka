package com.example.biblioteka.controller;

import com.example.biblioteka.bo.KsiazkaBO;
import com.example.biblioteka.dto.KsiazkaDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")

@RequestMapping("/restapi/ksiazka")
public class KsiazkaController {
    @Autowired
    private KsiazkaBO ksiazkaBO;

    //  Przyklad:  http://localhost:8080/restapi/ksiazka?page=0&size=3&sort=id,DESC&sort=nazwa,ASC
    @GetMapping
    public Page<KsiazkaDTO> getKsiazkas(@SortDefault(sort = "id") @PageableDefault(size = 20) final Pageable pageable) {
        return ksiazkaBO.getKsiazkas(pageable);
    }

    //  Przyklad: http://localhost:8080/restapi/ksiazka/find?q=p
    @GetMapping("/find")
    public List<KsiazkaDTO> findKsiazkas(@RequestParam("q") String input) {
        return ksiazkaBO.findKsiazkas(input);
    }


    @PostMapping
    public KsiazkaDTO addKsiazka(@RequestBody KsiazkaDTO ksiazka) {
        return ksiazkaBO.addKsiazka(ksiazka);
    }

    @DeleteMapping
    public ResponseEntity<String> deleteKsiazka(@RequestBody KsiazkaDTO ksiazka) {
        System.out.println("Kasowanie");
        ksiazkaBO.deleteKsiazka(ksiazka);
        return ResponseEntity.ok().build();
    }
}
