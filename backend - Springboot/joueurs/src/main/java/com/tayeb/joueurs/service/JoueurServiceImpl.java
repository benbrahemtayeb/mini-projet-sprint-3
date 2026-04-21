package com.tayeb.joueurs.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.tayeb.joueurs.entities.Equipe;
import com.tayeb.joueurs.entities.Joueur;
import com.tayeb.joueurs.repos.JoueurRepository;

import ch.qos.logback.core.joran.spi.HttpUtil.RequestMethod;

@Service
public class JoueurServiceImpl implements JoueurService{
	@Autowired
	JoueurRepository joueurRepository;
	@Override
	public Joueur saveJoueur(Joueur j) {
		return joueurRepository.save(j);
	}

	@Override
	public Joueur updateJoueur(Joueur j) {
		return joueurRepository.save(j);

	}
	@Override
	public void deleteJoueur(Joueur j) {
		joueurRepository.delete(j);
		
	}

	@Override
	public void deleteJoueurById(Long id) {
		joueurRepository.deleteById(id);
		
	}

	@Override
	public Joueur getJoueur(Long id) {
		return joueurRepository.findById(id).get();
	}

	@Override
	public List<Joueur> getAllJoueurs() {
		return joueurRepository.findAll();
	}
	@Override
	public List<Joueur> findByNomJoueur(String nom) {
		return joueurRepository.findByNomJoueur(nom);
	}
	@Override
	public List<Joueur> findByNomJoueurContains(String nom) {
		return joueurRepository.findByNomJoueurContains(nom);
	}
	@Override
	public List<Joueur> findByNomPrix(String nom, Double prix) {
		return joueurRepository.findByNomPrix(nom, prix);
	}
	@Override
	public List<Joueur> findByEquipe(Equipe equipe) {
		return joueurRepository.findByEquipe(equipe);
	}
	@Override
	public List<Joueur> findByEquipeIdEquipe(Long id) {
		return joueurRepository.findByEquipeIdEquipe(id);
	}
	@Override
	public List<Joueur> findByOrderByNomJoueurAsc() {
		return joueurRepository.findByOrderByNomJoueurAsc();
	}
	@Override
	public List<Joueur> trierJoueursNomsPrix() {
		return joueurRepository.trierJoueursNomsPrix();
	}
}
