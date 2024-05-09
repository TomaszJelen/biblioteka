package com.example.biblioteka.controller;

import com.example.biblioteka.bo.CzytelnikBO;
import com.example.biblioteka.dto.CzytelnikDTO;
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
@RequestMapping("/restapi/czytelnik")
public class CzytelnikController {
    @Autowired
    private CzytelnikBO czytelnikBO;

//  Przyklad:  http://localhost:8080/restapi/czytelnik?page=0&size=3&sort=id,DESC&sort=imie,ASC
    @GetMapping
    public Page<CzytelnikDTO> getCzytelniks(@SortDefault(sort = "id") @PageableDefault(size = 20) final Pageable pageable) {
        return czytelnikBO.getCzytelniks(pageable);
    }

    //  Przyklad: http://localhost:8080/restapi/czytelnik/find?q=p
    @GetMapping("/find")
    public List<CzytelnikDTO> findCzytelniks(@RequestParam("q") String input) {
        return czytelnikBO.findCzytelniks(input);
    }


    @PostMapping
    public CzytelnikDTO addCzytelnik(@RequestBody CzytelnikDTO czytelnik) {
        return czytelnikBO.addCzytelnik(czytelnik);
    }

//    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping
    public ResponseEntity<String> deleteCzytelnik(@RequestBody CzytelnikDTO czytelnik) {
        System.out.println("Kasowanie");
        czytelnikBO.deleteCzytelnik(czytelnik);
        return ResponseEntity.ok().build();
    }
}
