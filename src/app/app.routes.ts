import { Routes } from '@angular/router';
import { Joueurs } from './joueurs/joueurs';
import { AddJoueur } from './add-joueur/add-joueur';
import { UpdateJoueur } from './update-joueur/update-joueur';
import { RechercheParEquipe } from './recherche-par-equipe/recherche-par-equipe';
import { RechercheParNom } from './recherche-par-nom/recherche-par-nom';
import { Login } from './login/login';
import { Forbidden } from './forbidden/forbidden';
import { joueurGuard } from './joueur-guard';
import { ListeEquipes } from './liste-equipes/liste-equipes';
import { UpdateEquipe } from './update-equipe/update-equipe';

export const routes: Routes = [
    {path: "joueurs", component:Joueurs}, 
    {path: "add-joueur",component:AddJoueur,canActivate:[joueurGuard]},
    {path: "updateJoueur/:id", component: UpdateJoueur},
    {path: "rechercheParEquipe", component: RechercheParEquipe},
    {path: "rechercheParNom", component: RechercheParNom},
    {path: 'login', component: Login},
    {path: 'app-forbidden', component: Forbidden},
    {path: "listeEquipes", component : ListeEquipes},
    {path: "updateEquipe", component : UpdateEquipe},
    {path: "", redirectTo:"joueurs", pathMatch: "full"}
];
