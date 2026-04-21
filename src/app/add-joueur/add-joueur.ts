import { Component, OnInit } from '@angular/core';
import { Joueur } from '../model/joueur.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { joueur } from '../services/joueur';
import { Router } from '@angular/router';
import { Equipe } from '../model/equipe.model';


@Component({
  selector: 'app-add-joueur',
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './add-joueur.html',
})
export class AddJoueur implements OnInit{
  newJoueur= new Joueur();
  equipes!: Equipe[];
  newIdEquipe!: number;
  newEquipe!: Equipe;
  joueurForm!: FormGroup;
  constructor(private joueurService: joueur,private router :Router,private fb: FormBuilder){}
  ngOnInit(): void {
    this.joueurService.listeEquipes().
    subscribe(joueur => {console.log(joueur);
    this.equipes = joueur._embedded.equipes}
    );
    this.joueurForm = this.fb.group({
      /* idJoueur: ['', [Validators.required,Validators.pattern('^[0-9]+$')]], */
      nomJoueur: ['', [Validators.required, Validators.minLength(6),Validators.pattern(/^[A-Za-zÀ-ÿ\s'-]+$/)]],
      email: ['',[Validators.required, Validators.email]],
      equipe: ['', Validators.required],
      dateTransfert: ['', Validators.required],
      dureContrat: ['', [Validators.required,Validators.min(1)]],
      prixJoueur: ['', [Validators.required,Validators.min(0.1)]]
    })
  }
  
  addJoueur(){ 
    this.newEquipe = this.equipes.find(eqp => eqp.idEquipe == this.newIdEquipe)!;
    this.newJoueur.equipe = this.newEquipe;
    this.joueurService.ajouterJoueur(this.newJoueur)
    .subscribe(joueur => {
      console.log(joueur);
      this.router.navigate(['joueurs']);
    });
    
  }
    
}
