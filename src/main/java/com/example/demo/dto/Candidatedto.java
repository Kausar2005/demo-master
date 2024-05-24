package com.example.demo.dto;

import com.example.demo.CustomLocalDateDeserializer;
import com.example.demo.entity.User;
import com.example.demo.entity.Vacancy;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Candidatedto {


    private int vacancy;

    private int user;
    @JsonDeserialize(using = CustomLocalDateDeserializer.class)
    private LocalDate date;
    private String coverLetter;
}
