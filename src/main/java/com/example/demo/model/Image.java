package com.example.demo.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="images")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Image {
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE

    )
    private Long id;
    private Long parrentId;
    private Long size;
    private String type;
    private boolean isPrievImage;
    @Lob
    private  byte[] bytes;


}
