package com.example.demo.auth;

public class EmailAlreadyExistsException extends Throwable {
    public EmailAlreadyExistsException(String s) {
        super(s);
    }
}
