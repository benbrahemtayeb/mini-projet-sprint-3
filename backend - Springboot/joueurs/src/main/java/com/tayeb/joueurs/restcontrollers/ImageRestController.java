package com.tayeb.joueurs.restcontrollers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.tayeb.joueurs.entities.Image;
import com.tayeb.joueurs.entities.Joueur;
import com.tayeb.joueurs.service.ImageService;
import com.tayeb.joueurs.service.JoueurService;

@RestController
@RequestMapping("/api/image")
@CrossOrigin
public class ImageRestController {

    @Autowired
    ImageService imageService;

    @Autowired
    JoueurService joueurService;

   
    @PostMapping("/upload")
    public Image uploadImage(@RequestParam("image") MultipartFile file) throws IOException {
        return imageService.uploadImage(file);
    }

   
    @GetMapping("/get/info/{id}")
    public Image getImageDetails(@PathVariable("id") Long id) throws IOException {
        return imageService.getImageDetails(id);
    }

   
    @GetMapping("/get/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable("id") Long id) throws IOException {
        return imageService.getImage(id);
    }

   
    @DeleteMapping("/delete/{id}")
    public void deleteImage(@PathVariable("id") Long id) {
        imageService.deleteImage(id);
    }

    
    @PostMapping("/uploadImageJoueur/{idJoueur}")
    public Image uploadImageJoueur(@RequestParam("image") MultipartFile file,
                                   @PathVariable("idJoueur") Long idJoueur) throws IOException {
        return imageService.uploadImageJoueur(file, idJoueur);
    }

    
    @GetMapping("/getImagesJoueur/{idJoueur}")
    public List<Image> getImagesJoueur(@PathVariable("idJoueur") Long idJoueur) {
        return imageService.getImagesParJoueur(idJoueur);
    }


    @PostMapping("/uploadFS/{id}")
    public void uploadImageFS(@RequestParam("image") MultipartFile file,
                              @PathVariable("id") Long id) throws IOException {
        Joueur j = joueurService.getJoueur(id);
        j.setImagePath(id + ".jpg");
        Files.write(
            Paths.get(System.getProperty("user.home") + "/images/" + j.getImagePath()),
            file.getBytes()
        );
        joueurService.saveJoueur(j);
    }

    @GetMapping(value = "/loadfromFS/{id}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getImageFS(@PathVariable("id") Long id) throws IOException {
        Joueur j = joueurService.getJoueur(id);
        if (j == null || j.getImagePath() == null) {
            return ResponseEntity.notFound().build();
        }
        byte[] imageBytes = Files.readAllBytes(
            Paths.get(System.getProperty("user.home") + "/images/" + j.getImagePath())
        );
        return ResponseEntity.ok()
            .contentType(MediaType.IMAGE_JPEG)
            .body(imageBytes);
    }
}