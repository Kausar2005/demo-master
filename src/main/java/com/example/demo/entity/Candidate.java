package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "Candidate")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Candidate {
    @Id
    @SequenceGenerator(
            name = "candidate_sequence",
            sequenceName = "candidate_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "candidate_sequence"
    )
    private Long id;

    @OneToOne
    @JoinColumn(name = "vacancy_id")
    private Vacancy vacancy;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private User user;

    private LocalDate date;
    private String coverLetter;

}
