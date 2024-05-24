package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;


@Entity
@Table(name ="Vacancies")

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Vacancy {
    @Id
    @SequenceGenerator(
            name = "vacancy_sequence",
            sequenceName = "vacancy_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "vacancy_sequence"
    )
    private Long id;
    @ManyToOne
    @JoinColumn(name = "company_id")
    @JsonIgnore
    private User company;
    private String name;
    private String descp ;
    private int salaryA;
    private int salaryB;
    @Column(name = "experience")
    private int exp;
    private String img;
    private LocalDate date;
    @ManyToOne
    @JoinColumn(name = "vacancy_id")
    private VacancyCategory category;
    private String century;
    private String location;



}
