import { Component, OnInit } from '@angular/core';
import { Equipe } from '../model/equipe.model';
import { joueur } from '../services/joueur';
import { UpdateEquipe } from '../update-equipe/update-equipe';

@Component({
  selector: 'app-liste-equipes',
  imports: [UpdateEquipe],
  templateUrl: './liste-equipes.html',
  styles: ``
})
export class ListeEquipes implements OnInit{
  equipes!: Equipe[];
  updatedEqp:Equipe = {"idEquipe":0,"nomEquipe":""};
  ajout:boolean=true;
  edit:boolean=false;
  constructor(private joueurService: joueur){}
  ngOnInit(): void {
    this.joueurService.listeEquipes().
    subscribe(joueur => {console.log(joueur);
      this.equipes = joueur._embedded.equipes;
    }
    );
      console.log(this.equipes)
  }
  equipeUpdated(eqp:Equipe){
    this.joueurService.ajouterEquipe(eqp).
    subscribe( ()=> this.chargerEquipe())
  }
  chargerEquipe(){
    this.joueurService.listeEquipes().
    subscribe(eqps => {this.equipes = eqps._embedded.equipes;
    console.log(eqps);
    });
  }
  updateEqp(eqp:Equipe) {
    this.updatedEqp=eqp
    this.ajout=false;
    this.edit=true;
  }
  supprimerEquipe(eqp: Equipe) {
    const confirmation = confirm(`Êtes-vous sûr de vouloir supprimer l'équipe "${eqp.nomEquipe}" ?`);
    if (confirmation) {
      this.joueurService.supprimerEquipe(eqp.idEquipe).subscribe({
        next: () => {
          this.chargerEquipe(); 
    }});
  }  
  }
}
