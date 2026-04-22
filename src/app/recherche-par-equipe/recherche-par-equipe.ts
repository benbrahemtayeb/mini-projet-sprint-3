import { Component, OnInit } from '@angular/core';
import { Joueur } from '../model/joueur.model';
import { joueur } from '../services/joueur';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Equipe } from '../model/equipe.model';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-recherche-par-equipe',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './recherche-par-equipe.html',
})
export class RechercheParEquipe implements OnInit{
  joueurs?: Joueur[];
  equipes?: Equipe[];
  idEquipe?: number;
  constructor(private joueurService: joueur,public authService: Auth){};
  ngOnInit(): void {
    this.joueurs=[];
    this.joueurService.listeEquipes().
    subscribe(joueur => {console.log(joueur);
      this.equipes = joueur._embedded.equipes;
    }
    );
  }
  onChange() {
    this.joueurService.rechercherParEquipe(this.idEquipe!).subscribe(joueurs => {
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
  chargerProduits(){
    this.joueurService.listeJoueur().subscribe(joueur => {
    console.log(joueur);
    this.joueurs = joueur;
    });
  }
  supprimerJoueur(j: Joueur){
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.joueurService.supprimerJoueur(j.idJoueur!).subscribe(() => {
      console.log("Produit supprimé");
      this.chargerProduits();
    });
  } 
}
