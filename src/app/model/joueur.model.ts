import { Equipe } from "./equipe.model";
import { Image } from "./image.model";
export class Joueur{
    idJoueur?: number;
    nomJoueur?: string;
    email?: String;
    dateTransfert?: Date;
    dureContrat?: number;
    prixJoueur?: number;
    equipe?: Equipe;
    images?: Image[];
    imagePath?: string;
    imageStr?: string;
    
}