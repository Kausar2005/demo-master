package com.example.demo.service;

import com.example.demo.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MessageService {
    private final MessageRepository repository;
    @Autowired
    public MessageService(MessageRepository repository) {
        this.repository = repository;
    }
}
