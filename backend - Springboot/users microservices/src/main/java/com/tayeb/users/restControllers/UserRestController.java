package com.tayeb.users.restControllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tayeb.users.entities.User;
import com.tayeb.users.service.UserService;

@RestController
@CrossOrigin(origins = "*")
public class UserRestController {
	@Autowired
	UserService userService;
	@GetMapping("all")
	public List<User> getAllUsers() {
		return userService.findAllUsers();
	}
	
}