package com.example.demo.service;

import com.example.demo.dto.Candidatedto;
import com.example.demo.entity.Candidate;
import com.example.demo.entity.User;
import com.example.demo.entity.Vacancy;
import com.example.demo.repository.CandidateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CandidateService {
    private final CandidateRepository repository;
    private final UserService userService;
    private  final VacancyService vacancyService;
    @Autowired
    public CandidateService(CandidateRepository repository, UserService userService, VacancyService vacancyService) {
        this.repository = repository;
        this.userService = userService;
        this.vacancyService = vacancyService;
    }
    public Candidate createCandidate(Candidatedto candidate) {
        Candidate candidate1=new Candidate();
        candidate1.setCoverLetter(candidate.getCoverLetter());
        User employee=userService.getUserById((long)candidate.getUser());
        candidate1.setDate(candidate.getDate());
        candidate1.setUser(employee);
        Vacancy vacancy=vacancyService.getById((long)candidate.getVacancy());
        candidate1.setVacancy(vacancy);
        repository.save(candidate1);
        return candidate1;
    }

    public List<Candidate> getAllCandidates() {
        return repository.findAll();
    }
    public Optional<Candidate> getCandidateById(Long id) {
        return repository.findById(id);
    }

    public List<Vacancy> vacanciesThisUserCandidate(int id){
        return repository.vacanciesWhereThisUserCandidate((long)id);

    }

    public void deleteCandidateById(Long id) {
        repository.deleteById(id);
    }


}
