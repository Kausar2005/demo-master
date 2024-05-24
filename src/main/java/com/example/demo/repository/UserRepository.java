package com.example.demo.repository;

import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByGmailAndPassword(String gmail, String password);

    boolean existsByGmail(String gmail);

    Optional<User> findByGmail(String gmail);

    @Query("SELECT u FROM User u")
    List<User> getAllUsers();
    @Query("SELECT u FROM User u WHERE u.role = 'COMPANY'")
    List<User> getAllCompanies();

}
