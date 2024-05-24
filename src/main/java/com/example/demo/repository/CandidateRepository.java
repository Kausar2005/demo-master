package com.example.demo.repository;

import com.example.demo.entity.Candidate;
import com.example.demo.entity.Vacancy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CandidateRepository extends JpaRepository <Candidate , Long> {
    @Query("SELECT c.vacancy FROM Candidate c WHERE c.user.id = :userId")
    List<Vacancy> vacanciesWhereThisUserCandidate(@Param("userId") Long userId);
}
