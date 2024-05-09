package com.example.biblioteka.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.*;

//@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor //potrzebny?
@Entity
@Table(name = "ksiazka")
public class Ksiazka extends AbstractIdEntity {
    @Column(name = "id")
    @Id
    @GeneratedValue(generator = "ksiazka_seq")
    @SequenceGenerator(name = "ksiazka_seq", allocationSize = 1)
    private Integer id;
    @Column(name = "tytul")
    private String nazwa;

    @ToString.Exclude
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "Dziela_Autorow",
            joinColumns = { @JoinColumn(name = "id") },
            inverseJoinColumns = { @JoinColumn(name = "autorzy_id") }
    )
    private List<Autor> autorzy;

    @ToString.Exclude
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "ksiazka")
    private List<Wypozyczenie> wypozyczenia;
}