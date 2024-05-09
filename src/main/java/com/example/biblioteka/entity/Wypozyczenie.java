package com.example.biblioteka.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.time.LocalDateTime;

//@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor //potrzebny?
@Entity
@Table(name = "wypozyczenie")
public class Wypozyczenie extends AbstractIdEntity {
    @Column(name = "id")
    @Id
    @GeneratedValue(generator = "wypozyczenie_seq")
    @SequenceGenerator(name = "wypozyczenie_seq", allocationSize = 1)
    private Integer id;
    @Column(name = "data_od")
    private LocalDateTime fromDate;
    @Column(name = "data_do")
    private Date toDate;
    @Column(name = "data_oddania")
    private LocalDateTime returnDate;

    @ToString.Exclude
    @ManyToOne(fetch = FetchType.EAGER)
    private Czytelnik czytelnik;

    @ToString.Exclude
    @ManyToOne(fetch = FetchType.EAGER)
    private Ksiazka ksiazka;
}