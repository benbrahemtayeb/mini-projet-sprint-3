package com.tayeb.joueurs.service;

import java.io.IOException;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import com.tayeb.joueurs.entities.Image;

public interface ImageService {
    Image uploadImage(MultipartFile file) throws IOException;
    Image getImageDetails(Long id) throws IOException;
    ResponseEntity<byte[]> getImage(Long id) throws IOException;
    void deleteImage(Long id);
    Image uploadImageJoueur(MultipartFile file, Long idJoueur) throws IOException;
    List<Image> getImagesParJoueur(Long joueurId);
}