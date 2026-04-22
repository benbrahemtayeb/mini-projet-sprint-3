package com.tayeb.users.service;

import java.util.List;

import com.tayeb.users.entities.Role;
import com.tayeb.users.entities.User;
import com.tayeb.users.register.RegistrationRequest;

public interface UserService {
	User saveUser(User user);
	User findUserByUsername (String username);
	Role addRole(Role role);
	User addRoleToUser(String username, String rolename);
	List<User> findAllUsers();
	User registerUser(RegistrationRequest request);
	User validateToken(String code);
}