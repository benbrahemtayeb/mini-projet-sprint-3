import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Equipe } from '../model/equipe.model';
import { FormsModule } from '@angular/forms';
import { joueur } from '../services/joueur';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-update-equipe',
  imports: [FormsModule],
  templateUrl: './update-equipe.html',
  styles: ``
})
export class UpdateEquipe implements OnInit{
  @Input()
  equipe!: Equipe;

  @Output()
  equipeUpdated = new EventEmitter<Equipe>();

  @Input()
  ajout!:boolean;

  @Input()
  edit!:boolean

  errorMessage = '';
  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateCategorie ",this.equipe);
  }
  constructor(private joueurService: joueur,private router: Router){}
  ajoutSuccessAlert=false;
  addEquipe(): void {
    const equipeToAdd = { nomEquipe: this.equipe.nomEquipe };
    this.equipeUpdated.emit(equipeToAdd as Equipe);
    this.ajoutSuccessAlert = true;
    setTimeout(() => this.ajoutSuccessAlert = false, 3000);
    this.equipe.nomEquipe = '';
  }
  refreshPage() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['listeEquipes']);
    });
  }
}
