package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name ="Categories")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VacancyCategory {
    @Id
    @SequenceGenerator(
            name = "category_sequence",
            sequenceName = "category_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "category_sequence"
    )
    private Long id;
    @Column(unique = true)
    private String name;
}
