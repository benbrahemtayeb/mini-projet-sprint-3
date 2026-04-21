package com.tayeb.joueurs.entities;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "nomJoueur", types = { Joueur.class })
public interface JoueurProjection {
	public String getNomJoueur();
}
