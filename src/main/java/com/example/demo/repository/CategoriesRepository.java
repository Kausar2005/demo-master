package com.example.demo.repository;

import com.example.demo.entity.Candidate;
import com.example.demo.entity.VacancyCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriesRepository extends JpaRepository<VacancyCategory, Long> {
    public VacancyCategory getVacancyCategoriesById(Long id);
    public boolean existsByName(String name);

}
