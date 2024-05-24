package com.example.demo.service;

import com.example.demo.entity.VacancyCategory;
import com.example.demo.repository.CategoriesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    private final CategoriesRepository categoryRepository;

    @Autowired
    public CategoryService(CategoriesRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    public VacancyCategory createVacancyCategory(VacancyCategory category) {
    if (categoryRepository.existsByName(category.getName())) {
        return null;
    }

    else {
        return categoryRepository.save(category);
    }
    }
    public List<VacancyCategory> getAllVacancyCategory() {
        return categoryRepository.findAll();
    }

    public VacancyCategory getVacancyCategoryById(Long id) {
        return categoryRepository.getVacancyCategoriesById(id);
    }

    public VacancyCategory updateVacancyCategory(Long id, VacancyCategory newVacancyCategory) {
        Optional<VacancyCategory> optionalVacancyCategory = categoryRepository.findById(id);
        if (optionalVacancyCategory.isPresent()) {
            VacancyCategory existingVacancyCategory= optionalVacancyCategory.get();
            existingVacancyCategory.setName(newVacancyCategory.getName());
            return categoryRepository.save(existingVacancyCategory);
        } else {
            return null;
        }
    }

    public void deleteVacancyCategory(Long id) {
        categoryRepository.deleteById(id);
    }

}
