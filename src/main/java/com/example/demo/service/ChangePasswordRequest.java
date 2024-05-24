package com.example.demo.service;
import lombok.*;
@Getter
@Setter
@Builder
public class ChangePasswordRequest {

    private String currentPassword;
    private String newPassword;
    private String confirmationPassword;
}