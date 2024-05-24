package com.example.demo.dto;

import com.example.demo.CustomLocalDateDeserializer;
import com.example.demo.entity.User;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.*;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import java.time.LocalDate;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class VacancyDto {
    private Long company_id;
    private String name;
    private String descp ;
    private int salaryA;
    private int salaryB;
    @JsonDeserialize(using = CustomLocalDateDeserializer.class)
    private LocalDate date;
    private String location;
    private  int exp;
    private String century;
    private int category;
    private String img;

}
