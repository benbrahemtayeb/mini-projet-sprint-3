import { Component, OnInit } from '@angular/core';
import { Joueur } from '../model/joueur.model';
import { Image } from '../model/image.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { joueur } from '../services/joueur';
import { Router } from '@angular/router';
import { Equipe } from '../model/equipe.model';

@Component({
  selector: 'app-add-joueur',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-joueur.html',
})
export class AddJoueur implements OnInit {
  newJoueur = new Joueur();
  equipes!: Equipe[];
  newIdEquipe!: number;
  newEquipe!: Equipe;
  joueurForm!: FormGroup;
  uploadedImage!: File;
  imagePath: any;

  constructor(private joueurService: joueur, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.joueurService.listeEquipes().subscribe(joueur => {
      this.equipes = joueur._embedded.equipes;
    });
    this.joueurForm = this.fb.group({
      nomJoueur: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^[A-Za-zÀ-ÿ\s'-]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      equipe: ['', Validators.required],
      dateTransfert: ['', Validators.required],
      dureContrat: ['', [Validators.required, Validators.min(1)]],
      prixJoueur: ['', [Validators.required, Validators.min(0.1)]]
    });
  }

  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => { this.imagePath = reader.result; };
  }

  addJoueur() {
    this.newEquipe = this.equipes.find(eqp => eqp.idEquipe == this.newIdEquipe)!;
    this.newJoueur.equipe = this.newEquipe;

    this.joueurService.ajouterJoueur(this.newJoueur).subscribe((prod) => {
        if (this.uploadedImage) {
            // Save to DB image table (used by the list)
            this.joueurService.uploadImageJoueur(
                this.uploadedImage,
                this.uploadedImage.name,
                prod.idJoueur!
            ).subscribe(() => {});

            // Save to filesystem (used by loadfromFS)
            this.joueurService.uploadImageFS(
                this.uploadedImage,
                this.uploadedImage.name,
                prod.idJoueur!
            ).subscribe(() => {});
        }
        this.router.navigate(['joueurs']);
    });
}
}