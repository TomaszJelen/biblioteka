package com.example.biblioteka.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

//@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor //potrzebny?
@Entity
@Table(name = "czytelnik")
public class Czytelnik extends AbstractIdEntity {
    @Column(name = "id")
    @Id
    @GeneratedValue(generator = "czytelnik_seq")
    @SequenceGenerator(name = "czytelnik_seq", allocationSize = 1)
    private Integer id;
    @Column(name = "imie", length = 64)
    private String imie;
    @Column(name = "nazwisko", length = 64)
    private String nazwisko;

    @ToString.Exclude
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "czytelnik")
    private List<Wypozyczenie> wypozyczenia;
}