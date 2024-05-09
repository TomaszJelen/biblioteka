package com.example.biblioteka.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "autor")
public class Autor extends AbstractIdEntity {
    @Column(name = "id")
    @Id
    @GeneratedValue(generator = "autor_seq")
    @SequenceGenerator(name = "autor_seq", allocationSize = 1)
    private Integer id;
    @Column(name = "imie", length = 64)
    private String imie;
    @Column(name = "nazwisko", length = 64)
    private String nazwisko;

    @ToString.Exclude
    @ManyToMany(mappedBy = "autorzy")
    private List<Ksiazka> ksiazki;
}