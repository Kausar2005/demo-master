package com.example.demo.auth;
import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import lombok.*;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest  {

    private String firstName;
    private String lastName;
    private String gmail;
    private String password;
    private String confirmPassword;
    private String role;
    private LocalDate birthdate;


    public String getRole() {
        return role;
    }
}