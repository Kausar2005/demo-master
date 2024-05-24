package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/companies")
    public List<User> getAllCompanies() {
        return userService.getAllCompanies();
    }
//    @GetMapping("/all")
//    public List<User> getAllUsers() {
//        return userService.getAllUsers();
//    }
//
//    @GetMapping("/{id}")
//    public User getUserById(@PathVariable Long id) {
//        return userService.getUserById(id);
//    }

//    @PostMapping("/register")
//    public JWTauthToken addUser(@RequestBody User user) {
//        return userService.addUser(user);
//    }


//    @PutMapping("/{id}")
//    public User updateUser(@PathVariable Long id, @RequestBody User userDetails) {
//        return userService.updateUser(id, userDetails);
//    }
//
//    @DeleteMapping("/{id}")
//    public void deleteUser(@PathVariable Long id) {
//        userService.deleteUser(id);
//    }

//    @PostMapping("/login")
//    public JWTauthToken findByGmailAndPassword(@RequestBody Map<String, String> credentials) {
//        String email = credentials.get("email");
//        String password = credentials.get("password");
//        JWTauthToken token=    userService.login(email, password);
//        return new JWTauthToken("");
//    }

}
