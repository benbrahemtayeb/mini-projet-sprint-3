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
  ngOnInit(): void {
    this.chargerProduits();
    this.joueurService.listeJoueur().subscribe(joueur => {
      console.log(joueur);
      this.joueurs = joueur;
      });   
  }
  joueurs?: Joueur[];
  constructor(private joueurService: joueur,public authService: Auth){
    //this.joueurs=joueurService.listeJoueur();
  }
  chargerProduits(){
    this.joueurService.listeJoueur().subscribe(joueur => {
    console.log(joueur);
    this.joueurs = joueur;
    });
  }
  supprimerJoueur(j: Joueur){
    let conf = confirm(`Êtes-vous sûr de vouloir supprimer le joueur "${j.nomJoueur}" ?`)
    if (conf)
      this.joueurService.supprimerJoueur(j.idJoueur!).subscribe(() => {
      console.log("Produit supprimé");
      this.chargerProduits();
    });
  } 
}
