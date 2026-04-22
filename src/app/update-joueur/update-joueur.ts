import { Component, OnInit } from '@angular/core';
import { Joueur } from '../model/joueur.model';
import { Image } from '../model/image.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { joueur } from '../services/joueur';
import { Equipe } from '../model/equipe.model';

@Component({
  selector: 'app-update-joueur',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './update-joueur.html',
  styles: ``
})
export class UpdateJoueur implements OnInit {
  currentJoueur = new Joueur;
  equipes!: Equipe[];
  updatedEquipeId?: number;
  joueurForm!: FormGroup;
  message = '';
  myImage!: string;
  uploadedImage!: File;
  isImageUpdated: Boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private joueurService: joueur,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.joueurService.listeEquipes().subscribe(joueur => {
      this.equipes = joueur._embedded.equipes;
    });

    this.joueurService.consulterJoueur(this.activatedRoute.snapshot.params['id'])
      .subscribe(joueur => {
        this.currentJoueur = joueur;
        this.updatedEquipeId = this.currentJoueur.equipe?.idEquipe;
    });
    this.joueurService.getImagesJoueur(this.currentJoueur.idJoueur!)
        .subscribe((imgs: Image[]) => {
          this.currentJoueur.images = imgs;
    });

    this.joueurForm = this.fb.group({
      idJoueur: [{ value: this.currentJoueur.idJoueur, disabled: true }],
      nomJoueur: [this.currentJoueur.nomJoueur, [Validators.required, Validators.minLength(6), Validators.pattern(/^[A-Za-zÀ-ÿ\s'-]+$/)]],
      email: [this.currentJoueur.email, [Validators.required, Validators.email]],
      equipe: [this.currentJoueur.equipe, Validators.required],
      dateTransfert: [this.currentJoueur.dateTransfert, Validators.required],
      dureContrat: [this.currentJoueur.dureContrat, [Validators.required, Validators.min(1)]],
      prixJoueur: [this.currentJoueur.prixJoueur, [Validators.required, Validators.min(0.1)]]
    });
  }

  onImageUpload(event: any) {
    if (event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated = true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => { this.myImage = reader.result as string; };
    }
  }

  onAddImageJoueur() {
    if (!this.uploadedImage) {
        alert("Veuillez choisir une image d'abord.");
        return;
    }
    this.joueurService.uploadImageJoueur(
        this.uploadedImage,
        this.uploadedImage.name,
        this.currentJoueur.idJoueur!
    ).subscribe((img: Image) => {
        if (!this.currentJoueur.images) this.currentJoueur.images = [];
        this.currentJoueur.images.push(img);
    });
  }

  supprimerImage(img: Image) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.joueurService.supprimerImage(img.idImage).subscribe(() => {
        const index = this.currentJoueur.images!.indexOf(img, 0);
        if (index > -1) {
          this.currentJoueur.images!.splice(index, 1);
        }
      });
  }

  updateJoueur() {
    this.currentJoueur.nomJoueur = this.joueurForm.get('nomJoueur')?.value;
    this.currentJoueur.email = this.joueurForm.get('email')?.value;
    this.currentJoueur.dateTransfert = this.joueurForm.get('dateTransfert')?.value;
    this.currentJoueur.prixJoueur = this.joueurForm.get('prixJoueur')?.value;
    const updatedEquipeId = this.joueurForm.get('equipe')?.value;
    this.currentJoueur.equipe = this.equipes.find(eqp => eqp.idEquipe == updatedEquipeId);

    if (this.isImageUpdated) {
        this.joueurService.uploadImageFS(
            this.uploadedImage,
            this.uploadedImage.name,
            this.currentJoueur.idJoueur!
        ).subscribe(() => {
            this.joueurService.updateJoueur(this.currentJoueur).subscribe(() => {
                this.router.navigate(['joueurs']);
            });
        });
    } else {
        this.joueurService.updateJoueur(this.currentJoueur).subscribe(() => {
            this.router.navigate(['joueurs']);
        });
    }
}
}