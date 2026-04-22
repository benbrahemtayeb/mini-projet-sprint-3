package com.tayeb.users.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tayeb.users.entities.Role;
import com.tayeb.users.entities.User;
import com.tayeb.users.entities.VerificationToken;
import com.tayeb.users.exception.EmailAlreadyExistsException;
import com.tayeb.users.exception.ExpiredTokenException;
import com.tayeb.users.exception.InvalidTokenException;
import com.tayeb.users.register.RegistrationRequest;
import com.tayeb.users.repos.RoleRepository;
import com.tayeb.users.repos.UserRepository;
import com.tayeb.users.repos.VerificationTokenRepository;
import com.tayeb.users.util.EmailSender;




@Transactional
@Service
public class UserServiceImpl implements UserService {
	@Autowired
	UserRepository userRepository;
	@Autowired
	RoleRepository roleRepository;
	@Autowired
	VerificationTokenRepository verificationTokenRepo;
	@Autowired
	EmailSender emailSender;
	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder;
	@Override
	public User saveUser(User user) {
		// TODO Auto-generated method stub
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		return userRepository.save(user);
	}

	@Override
	public User findUserByUsername(String username) {
		// TODO Auto-generated method stub
		return userRepository.findByUsername(username);
	}

	@Override
	public Role addRole(Role role) {
		// TODO Auto-generated method stub
		return roleRepository.save(role);
	}

	@Override
	public User addRoleToUser(String username, String rolename) {
		User usr=userRepository.findByUsername(username);
		Role role=roleRepository.findByRole(rolename);
		usr.getRoles().add(role);
		//userRepository.save(usr);
		return usr;
	}
	@Override
	public List<User> findAllUsers() {
		// TODO Auto-generated method stub
		return userRepository.findAll();
	}
	
	
	
	
	
	@Override
	public User registerUser(RegistrationRequest request) {
	    Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());
	    if (optionalUser.isPresent())
	        throw new EmailAlreadyExistsException("Email déjà existant!");

	    User newUser = new User();
	    newUser.setUsername(request.getUsername());
	    newUser.setEmail(request.getEmail());
	    newUser.setPassword(bCryptPasswordEncoder.encode(request.getPassword()));
	    newUser.setEnabled(false);
	    userRepository.save(newUser);

	    Role r = roleRepository.findByRole("USER");
	    List<Role> roles = new ArrayList<>();
	    roles.add(r);
	    newUser.setRoles(roles);
	    userRepository.save(newUser);

	    String code = generateCode();
	    VerificationToken token = new VerificationToken(code, newUser);
	    verificationTokenRepo.save(token);

	    sendEmailUser(newUser, token.getToken());
	    return newUser;
	}

	public String generateCode() {
	    Random random = new Random();
	    Integer code = 100000 + random.nextInt(900000);
	    return code.toString();
	}

	public void sendEmailUser(User u, String code) {
	    String emailBody = "Bonjour <h1>" + u.getUsername() + "</h1>"
	        + " Votre code de validation est <h1>" + code + "</h1>";
	    emailSender.sendEmail(u.getEmail(), emailBody);
	}

	@Override
	public User validateToken(String code) {
	    VerificationToken token = verificationTokenRepo.findByToken(code);
	    if (token == null)
	        throw new InvalidTokenException("Invalid Token");

	    User user = token.getUser();
	    Calendar calendar = Calendar.getInstance();
	    if ((token.getExpirationTime().getTime() - calendar.getTime().getTime()) <= 0) {
	        verificationTokenRepo.delete(token);
	        throw new ExpiredTokenException("Expired Token");
	    }
	    user.setEnabled(true);
	    userRepository.save(user);
	    return user;
	}
	
	

}