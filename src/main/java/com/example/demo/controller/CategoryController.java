package com.example.demo.controller;

import com.example.demo.entity.VacancyCategory;
import com.example.demo.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/category")
public class CategoryController {
    private CategoryService service;
    @Autowired
    public CategoryController(CategoryService service) {
        this.service = service;
    }
    @PostMapping("/create")
    public VacancyCategory createCandidate(@RequestBody String category) {
        VacancyCategory forSaveCategory=new VacancyCategory();
        forSaveCategory.setName(category);
        return service.createVacancyCategory(forSaveCategory);

    }
    @GetMapping("/all")
    public List<VacancyCategory> all() {
       return service.getAllVacancyCategory();

    }
}
