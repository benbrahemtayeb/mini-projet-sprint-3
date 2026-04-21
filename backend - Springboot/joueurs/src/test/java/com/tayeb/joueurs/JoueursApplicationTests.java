package com.tayeb.joueurs;

import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.tayeb.joueurs.entities.Equipe;
import com.tayeb.joueurs.entities.Joueur;
import com.tayeb.joueurs.repos.JoueurRepository;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class JoueursApplicationTests {

	@Autowired
	private JoueurRepository joueurRepository;
	@Test
	public void testCreateJoueur() {
		Joueur jou = new Joueur("Ali Abdi","abdialiPro@gmail.com",3.0,1,new Date());
		joueurRepository.save(jou);
	}
	@Test
	public void testFindJoueur()
	{
		Joueur j = joueurRepository.findById(1L).get();
		System.out.println(j);
	}
	@Test
	public void testUpdateJoueur()
	{
		Joueur j = joueurRepository.findById(1L).get();
		j.setPrixJoueur(1000.0);
		joueurRepository.save(j);
	}
	@Test
	public void testDeleteJoueur()
	{
		joueurRepository.deleteById(1L);;
	}

	@Test
	public void testListerTousJoueur()
	{
		List<Joueur> jous = joueurRepository.findAll();
		for (Joueur j : jous)
		{
			System.out.println(j);
		}
	}
	@Test
	public void testFindJoueurByNom()
	{
		List<Joueur> joueurs = joueurRepository.findByNomJoueur("Neymar");
		for(Joueur j:joueurs)
			System.out.println(j);
	}
	@Test
	public void testFindJoueurByNomContains()
	{
		List<Joueur> joueurs = joueurRepository.findByNomJoueurContains("e");
		for(Joueur j:joueurs)
			System.out.println(j);
	}
	@Test
	public void testfindByNomPrix()
	{
		List<Joueur> joueurs = joueurRepository.findByNomPrix("Neymar", 10.0);
		for (Joueur j : joueurs)
		{
			System.out.println(j);
		}
	}
	@Test
	public void testfindByEquipe()
	{
		Equipe eqp = new Equipe();
		eqp.setIdEquipe(2L);
		List<Joueur> joueurs = joueurRepository.findByEquipe(eqp);
		for (Joueur j : joueurs)
		{
			System.out.println(j);
		}
	}
	@Test
	public void findByEquipeIdEquipe()
	{
		List<Joueur> joueurs = joueurRepository.findByEquipeIdEquipe(2L);
		for (Joueur j : joueurs)
		{
			System.out.println(j);
		}
	 }
	@Test
	public void testfindByOrderByNomJoueurAsc()
	{
		List<Joueur> joueurs = joueurRepository.findByOrderByNomJoueurAsc();
		for (Joueur j : joueurs)
		{
			System.out.println(j);
		}
	}
	@Test
	public void testTrierProduitsNomsPrix()
	{
		List<Joueur> joueurs = joueurRepository.trierJoueursNomsPrix();
		for (Joueur p : joueurs)
		{
			System.out.println(p);
		}
	}




}
