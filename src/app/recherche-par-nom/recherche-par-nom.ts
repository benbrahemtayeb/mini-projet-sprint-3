import { Component, NgModule, OnInit } from '@angular/core';
import { Joueur } from '../model/joueur.model';
import { joueur } from '../services/joueur';
import { CommonModule } from '@angular/common';
import { Equipe } from '../model/equipe.model';
import { RouterLink } from '@angular/router';
import { SearchFilterPipe } from '../search-filter-pipe';
import { FormsModule } from '@angular/forms';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-recherche-par-nom',
  imports: [CommonModule,RouterLink,FormsModule,SearchFilterPipe],
  templateUrl: './recherche-par-nom.html',
  styles: ``
})
export class RechercheParNom implements OnInit{
  searchTerm!: string;
  joueurs!: Joueur[];
  equipes?: Equipe[];
  allJoueurs!: Joueur[];
  idEquipe?: number;
  constructor(private joueurService: joueur,public authService: Auth){
    this.joueurService.listeJoueur().subscribe(prods => {
      console.log(prods);
      this.joueurs = prods;
    });
    //this.allJoueurs=this.joueurService.listeJoueur();
  }
  ngOnInit(): void {
    this.joueurService.listeJoueur().subscribe(joueur => {
      console.log(joueur);
      this.joueurs = joueur;
      });
  }
  onKeyUp(terme: string): void {
    this.joueurs = this.allJoueurs.filter(item =>
    item.nomJoueur?.toLowerCase().includes(terme));
      
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
