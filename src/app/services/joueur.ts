import { Injectable } from '@angular/core';
import { Joueur } from '../model/joueur.model';
import { Equipe } from '../model/equipe.model';
import { EquipeWrapper } from '../model/equipeWrapped.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
  };
@Injectable({
  providedIn: 'root'
})
export class joueur {
  joueurs! : Joueur[];
  Joueur!: Joueur;
  equipes!: Equipe[];
  joueursRecherche?: Joueur[];
  apiURL: string = 'http://localhost:8085/joueurs/api';
  apiURLEqp: string = 'http://localhost:8085/joueurs/joueur';
  constructor(private http : HttpClient){

    /*this.equipes=[
      {idEquipe: 1, nomEquipe: "Al Nassr"},
      {idEquipe: 2, nomEquipe: "Inter Miami"},
      {idEquipe: 3, nomEquipe: "Esperance Tunis"},
      {idEquipe: 4, nomEquipe: "Frankfurt"},
      {idEquipe: 5, nomEquipe: "Liverpool"},
      {idEquipe: 6, nomEquipe: "Real Madrid"}
    ];

    this.joueurs=[
      {idJoueur: 1, nomJoueur: "Cristiano Ronaldo", dateTransfert: new Date("3-12-2022"), email: "cristianosuii@gmail.com" ,dureContrat: 2, prixJoueur: 12,equipe: {idEquipe: 1, nomEquipe: "Al Nassr"}},
      {idJoueur: 2, nomJoueur: "Lionel Messi", dateTransfert: new Date("07-15-2023"), email: "leomessi@gmail.com" , dureContrat: 1, prixJoueur: 18, equipe: {idEquipe: 2, nomEquipe: "Inter Miami"}},
      {idJoueur: 3, nomJoueur: "Youssef Blaili", dateTransfert: new Date("07-28-2024"), email: "blailiest@gmail.com" , dureContrat: 2, prixJoueur: 1.70, equipe: {idEquipe: 3, nomEquipe: "Esperance Tunis"}},
      {idJoueur: 4, nomJoueur: "Ellyes Skhiri", dateTransfert: new Date("07-05-2023"), email: "skhiritunisie@gmail.com" , dureContrat: 4, prixJoueur: 7.50, equipe: {idEquipe: 4, nomEquipe: "Frankfurt"}},
      {idJoueur: 5, nomJoueur: "Bechir Ben Said", dateTransfert: new Date("07-01-2022"), email: "bachra@gmail.com" , dureContrat: 3, prixJoueur: 0.650, equipe:  {idEquipe: 3, nomEquipe: "Esperance Tunis"}},
      {idJoueur: 6, nomJoueur: "Sadio Mané", dateTransfert: new Date("08-01-2023"), email: "mané10@gmail.com" , dureContrat: 3, prixJoueur: 8, equipe:  {idEquipe: 1, nomEquipe: "Al Nassr"}},
    ];*/
  }
  listeJoueur():Observable<Joueur[]>{
    return this.http.get<Joueur[]>(this.apiURL);
  }
  ajouterJoueur(joueur : Joueur):Observable<Joueur>{
    if (joueur.equipe && typeof joueur.equipe === 'object' && 'idEquipe' in joueur.equipe) {
      joueur.equipe = joueur.equipe;
    }
    return this.http.post<Joueur>(this.apiURL,joueur,httpOptions);
  }
  supprimerJoueur( id: number){
    const url=`${this.apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }
  consulterJoueur(id: number): Observable<Joueur>{
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Joueur>(url);
  }
  updateJoueur(j: Joueur):Observable<Joueur>{
    return this.http.put<Joueur>(this.apiURL, j, httpOptions);
  }
  listeEquipes():Observable<EquipeWrapper>{
    return this.http.get<EquipeWrapper>(this.apiURLEqp);
  }
  consulterEquipe(id:number): Observable<Equipe>{
    const url = `${this.apiURLEqp}/${id}`;
    return this.http.get<Equipe>(url);
  }
  rechercherParEquipe(idEquipe: number):Observable< Joueur[]> {
    const url = `${this.apiURL}/joueursequipes/${idEquipe}`;
    return this.http.get<Joueur[]>(url);
  }
  rechercherParNom(nom: string):Observable< Joueur[]> {
      const url = `${this.apiURL}/joueursByName/${nom}`;
        return this.http.get<Joueur[]>(url);
    }
  ajouterEquipe(eqp: Equipe): Observable<Equipe> {
    return this.http.post<Equipe>(this.apiURLEqp, eqp, httpOptions);
  }
   updateEquipe(equipe: Equipe): Observable<Equipe> {
    const url = `${this.apiURLEqp}/${equipe.idEquipe}`;
    return this.http.put<Equipe>(url, equipe, httpOptions);
  }
  supprimerEquipe(id: number): Observable<Equipe> {
    const url = `${this.apiURLEqp}/${id}`;
    return this.http.delete<Equipe>(url, httpOptions);
  }
}
