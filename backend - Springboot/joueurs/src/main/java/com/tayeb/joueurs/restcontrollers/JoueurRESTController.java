package com.tayeb.joueurs.restcontrollers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.tayeb.joueurs.entities.Joueur;
import com.tayeb.joueurs.service.JoueurService;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class JoueurRESTController {
	@Autowired
	JoueurService joueurService;
	
	//@RequestMapping(method=RequestMethod.GET)
	@GetMapping()
	public List<Joueur> getAllJoueurs() {
		 return joueurService.getAllJoueurs();
	}
	//@RequestMapping(value="/{id}",method = RequestMethod.GET)
	@GetMapping("/{id}")
	public Joueur getJoueurById(@PathVariable("id") Long id) {
		return joueurService.getJoueur(id);
	}
	//RequestMapping(method = RequestMethod.POST)
	@PostMapping()
	public Joueur createJoueur(@RequestBody Joueur joueur) {
		return joueurService.saveJoueur(joueur);
	}
	//@RequestMapping(method = RequestMethod.PUT)
	@PutMapping()
	public Joueur updatJoueur(@RequestBody Joueur joueur) {
		return joueurService.updateJoueur(joueur);
	}
	//@RequestMapping(value="/{id}",method = RequestMethod.DELETE)
	@DeleteMapping("/{id}")
	public void deleteJoueur(@PathVariable("id") Long id)
	{
		joueurService.deleteJoueurById(id);
	}
	//@RequestMapping(value="/joueursequipes/{idCat}",method = RequestMethod.GET)
	@GetMapping("/joueursequipes/{idEquipe}")
	public List<Joueur> getJoueursByEquipeId(@PathVariable("idEquipe") Long idEquipe) {
		return joueurService.findByEquipeIdEquipe(idEquipe);
	}
	@GetMapping("/joueursByName/{nom}")
	public List<Joueur> findByNomJoueurContains(@PathVariable("nom") String nom) {
		return joueurService.findByNomJoueurContains(nom);
	}

}

