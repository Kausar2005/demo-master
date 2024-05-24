package com.example.demo.entity;

public enum Role {
    ADMIN,
    COMPANY,
    USER;
    public static Role fromString(String roleString) {
        if (roleString == null) {
            throw new IllegalArgumentException("Role string cannot be null");
        }
        switch (roleString.toLowerCase()) {
            case "user":
                return USER;
            case "company":
                return COMPANY;
            case "admin":
                return ADMIN;
            default:
                throw new IllegalArgumentException("Invalid role: " + roleString);
        }
    }

}
