package com.example.demo.controller;

import com.example.demo.service.CandidateService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

@RequestMapping("api/v1/comment")
public class CommentController {
    private final CandidateService service;

    public CommentController(CandidateService service) {
        this.service = service;
    }
}
