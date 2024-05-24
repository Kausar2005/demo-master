package com.example.demo.repository;

import com.example.demo.entity.Vacancy;
import com.example.demo.entity.VacancyCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VacancyRepository
        extends JpaRepository<Vacancy,Long> {

    List<Vacancy> findAllByName(String name);


    List<Vacancy> findAll();

    VacancyCategory getVacanciesById(Long vacancyId);

    @Override
    void deleteById(Long id);
    @Query("SELECT v FROM Vacancy v WHERE NOT EXISTS (SELECT c FROM Candidate c WHERE c.vacancy.id = v.id AND c.user.id = :userId)")
    List<Vacancy> findVacanciesWhereNotCandidate(@Param("userId") Long userId);


}
