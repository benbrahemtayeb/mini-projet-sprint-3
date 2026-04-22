package com.tayeb.joueurs.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tayeb.joueurs.entities.Image;

public interface ImageRepository extends JpaRepository<Image, Long> {
}