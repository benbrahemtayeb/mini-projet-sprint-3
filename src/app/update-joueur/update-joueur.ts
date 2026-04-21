import { Component, OnInit } from '@angular/core';
import { Joueur } from '../model/joueur.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { joueur } from '../services/joueur';
import { Equipe } from '../model/equipe.model';


@Component({
  selector: 'app-update-joueur',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './update-joueur.html',
  styles: ``
})
export class UpdateJoueur implements OnInit{
  currentJoueur=new Joueur;
  equipes!: Equipe[];
  updatedEquipeId?: number;
  joueurForm!: FormGroup;
  message = '';
  constructor(private activatedRoute: ActivatedRoute,private router :Router, private joueurService: joueur,private fb: FormBuilder){
    
  }
  ngOnInit(): void {
    this?.joueurService.listeEquipes().
    subscribe(joueur => {console.log(joueur);
      this.equipes = joueur._embedded.equipes;
      }
    );
    this.joueurService.consulterJoueur(this.activatedRoute.snapshot.params['id']).
    subscribe( joueur =>{ this.currentJoueur = joueur; 
    this.updatedEquipeId=this.currentJoueur.equipe?.idEquipe;
    });
    this.joueurForm = this.fb.group({
      idJoueur: [{value: this.currentJoueur.idJoueur,disabled: true} ],
      nomJoueur: [this.currentJoueur.nomJoueur, [Validators.required, Validators.minLength(6), Validators.pattern(/^[A-Za-zÀ-ÿ\s'-]+$/)]],
      email: [this.currentJoueur.email,[Validators.required, Validators.email]],
      equipe: [this.currentJoueur.equipe, Validators.required],
      dateTransfert: [this.currentJoueur.dateTransfert, Validators.required],
      dureContrat: [this.currentJoueur.dureContrat, [Validators.required,Validators.min(1)]],
      prixJoueur: [this.currentJoueur.prixJoueur, [Validators.required,Validators.min(0.1)]]
    })
  }

  updateJoueur(){
    this.currentJoueur.nomJoueur = this.joueurForm.get('nomJoueur')?.value;
    this.currentJoueur.email = this.joueurForm.get('email')?.value;
    this.currentJoueur.dateTransfert = this.joueurForm.get('dateTransfert')?.value;
    this.currentJoueur.prixJoueur = this.joueurForm.get('prixJoueur')?.value;
    const updatedEquipeId = this.joueurForm.get('equipe')?.value;
    this.currentJoueur.equipe = this.equipes.find(eqp => eqp.idEquipe == updatedEquipeId);
    this.joueurService.updateJoueur(this.currentJoueur).subscribe(joueur => {
      this.router.navigate(['joueurs']);
    });
  }
}
