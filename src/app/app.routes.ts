import { Routes } from '@angular/router';
import { Joueurs } from './joueurs/joueurs';
import { AddJoueur } from './add-joueur/add-joueur';
import { UpdateJoueur } from './update-joueur/update-joueur';
import { RechercheParEquipe } from './recherche-par-equipe/recherche-par-equipe';
import { RechercheParNom } from './recherche-par-nom/recherche-par-nom';
import { Login } from './login/login';
import { Forbidden } from './forbidden/forbidden';
import { joueurGuard,adminGuard } from './joueur-guard';
import { ListeEquipes } from './liste-equipes/liste-equipes';
import { UpdateEquipe } from './update-equipe/update-equipe';
import { Register } from './register/register';
import { VerifEmail } from './verif-email/verif-email';


export const routes: Routes = [
    { path: "joueurs", component: Joueurs, canActivate: [joueurGuard] },
    { path: "add-joueur", component: AddJoueur, canActivate: [adminGuard] },
    { path: "updateJoueur/:id", component: UpdateJoueur, canActivate: [adminGuard] },
    { path: "rechercheParEquipe", component: RechercheParEquipe, canActivate: [joueurGuard] },
    { path: "rechercheParNom", component: RechercheParNom, canActivate: [joueurGuard] },
    { path: "listeEquipes", component: ListeEquipes, canActivate: [adminGuard] },
    { path: "updateEquipe", component: UpdateEquipe, canActivate: [adminGuard] },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'verifEmail', component: VerifEmail },
    { path: 'app-forbidden', component: Forbidden },
    { path: "", redirectTo: "joueurs", pathMatch: "full" },
];
