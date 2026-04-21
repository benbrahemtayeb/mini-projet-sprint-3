package com.tayeb.joueurs.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import com.tayeb.joueurs.entities.Equipe;

@RepositoryRestResource(collectionResourceRel = "equipes", path = "joueur")
public interface EquipeRepository extends JpaRepository<Equipe, Long> {
}