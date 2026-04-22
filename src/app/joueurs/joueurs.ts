import { Component, OnInit, } from '@angular/core';
import { Joueur } from '../model/joueur.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { joueur } from '../services/joueur';
import { RouterLink } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-joueurs',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './joueurs.html',
})
export class Joueurs implements OnInit{
  apiUrl: String = 'http://localhost:8085/joueurs/api';
  ngOnInit(): void {
    this.chargerProduits();
       
  }
  joueurs?: Joueur[];
  constructor(private joueurService: joueur,public authService: Auth){
    //this.joueurs=joueurService.listeJoueur();
  }
  chargerProduits() {
    this.joueurService.listeJoueur().subscribe(joueurs => {
        this.joueurs = joueurs;
        this.joueurs.forEach((j) => {
            this.joueurService.getImagesJoueur(j.idJoueur!).subscribe((imgs: any[]) => {
                if (imgs && imgs.length > 0) {
                    j.imageStr = 'data:' + imgs[0].type + ';base64,' + imgs[0].image;
                }
            });
        });
    });
}
supprimerJoueur(j: Joueur) {
  let conf = confirm(`Êtes-vous sûr de vouloir supprimer le joueur "${j.nomJoueur}" ?`);
  if (conf) {
      // First delete all images of this joueur, then delete the joueur
      this.joueurService.getImagesJoueur(j.idJoueur!).subscribe((imgs: any[]) => {
          if (imgs && imgs.length > 0) {
              const deleteRequests = imgs.map(img => 
                  this.joueurService.supprimerImage(img.idImage).toPromise()
              );
              Promise.all(deleteRequests).then(() => {
                  this.joueurService.supprimerJoueur(j.idJoueur!).subscribe(() => {
                      this.chargerProduits();
                  });
              });
          } else {
              this.joueurService.supprimerJoueur(j.idJoueur!).subscribe(() => {
                  this.chargerProduits();
              });
          }
      });
  }
}
}
