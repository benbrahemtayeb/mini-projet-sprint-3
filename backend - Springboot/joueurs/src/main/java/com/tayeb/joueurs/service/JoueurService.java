package com.tayeb.joueurs.service;

import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;

import com.tayeb.joueurs.entities.Equipe;
import com.tayeb.joueurs.entities.Joueur;

public interface JoueurService {
	Joueur saveJoueur(Joueur j);
	Joueur updateJoueur(Joueur j);
	void deleteJoueur(Joueur j);
	 void deleteJoueurById(Long id);
	Joueur getJoueur(Long id);
	List<Joueur> getAllJoueurs();
	List<Joueur> findByNomJoueur(String nom);
	List<Joueur> findByNomJoueurContains(String nom);
	List<Joueur> findByNomPrix (String nom, Double prix);
	List<Joueur> findByEquipe (Equipe equipe);
	List<Joueur> findByEquipeIdEquipe(Long id);
	List<Joueur> findByOrderByNomJoueurAsc();
	List<Joueur> trierJoueursNomsPrix();
}
