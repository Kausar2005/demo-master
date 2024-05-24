package com.example.demo.service;

import com.example.demo.dto.VacancyDto;
import com.example.demo.entity.Vacancy;
import com.example.demo.repository.VacancyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VacancyService {
    private final VacancyRepository vacancyRepository;
    private  final UserService company;
    private  final CategoryService categoryService;

    @Autowired
    public VacancyService(VacancyRepository vacancyRepository, UserService company,CategoryService categoryService) {
        this.vacancyRepository = vacancyRepository;
        this.company = company;
        this.categoryService=categoryService;

    }

    public List<Vacancy> getVacancy(){
        return vacancyRepository.findAll();

    }
    public List<Vacancy> getVacancyforEmployee(int id){
        return vacancyRepository.findVacanciesWhereNotCandidate((long)id);

    }
    public String addVacancy(VacancyDto dto){
        Vacancy vacancy=new Vacancy();
        vacancy.setCompany(company.getUserById(dto.getCompany_id()));
        vacancy.setName(dto.getName());
        vacancy.setDescp(dto.getDescp());
        vacancy.setSalaryA(dto.getSalaryA());
        vacancy.setSalaryB(dto.getSalaryB());
        vacancy.setImg(dto.getImg());
        vacancy.setDate(dto.getDate());
        vacancy.setLocation(dto.getLocation());
        vacancy.setExp(dto.getExp());
        vacancy.setCentury(dto.getCentury());
        vacancy.setCategory(categoryService.getVacancyCategoryById(Long.valueOf(dto.getCategory())));

        vacancyRepository.save(vacancy);
        return "Added "+dto.getName()+""+vacancy.getName();

    }

    public List<Vacancy> getByName(String name){
        return vacancyRepository.findAllByName(name);
    }
    public String updateVacancy(Vacancy vacancy){
        vacancyRepository.save(vacancy);
        return "success";
    }
    public void delete(Long id){
        vacancyRepository.deleteById(id);

    }
    public Vacancy getById(Long id){
        return vacancyRepository.getById(id);

    }
}
