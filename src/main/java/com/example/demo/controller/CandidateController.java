package com.example.demo.controller;

import com.example.demo.entity.Candidate;
import com.example.demo.dto.Candidatedto;
import com.example.demo.entity.Vacancy;
import com.example.demo.service.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/candidate")
public class CandidateController {

    private final CandidateService service;

    @Autowired
    public CandidateController(CandidateService service) {
        this.service = service;
    }

    @PostMapping("/create")
    public Candidate createCandidate(@RequestBody Candidatedto candidate) {
        return service.createCandidate(candidate);
    }

    @GetMapping("/all")
    public List<Candidate> getAllCandidates() {
        return service.getAllCandidates();
    }

    @GetMapping("/{id}")
    public Optional<Candidate> getCandidateById(@PathVariable Long id) {
        return service.getCandidateById(id);
    }

    @GetMapping("/vacancies/{id}")
    public List<Vacancy> getVacanciesWhereUserCandidate(@PathVariable  int id){
        return service.vacanciesThisUserCandidate(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteCandidateById(@PathVariable Long id) {
        service.deleteCandidateById(id);
    }


}
