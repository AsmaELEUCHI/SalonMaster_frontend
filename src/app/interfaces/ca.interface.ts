
//Données de formulaire de chiffres d'affaires
export interface CaDto {
    mois: string;
    annee: number;
    ca: number;
    id : number;  
  }

  export interface FormattedCaDto {
    mois: string;
    annee: number;
    ca: string; // ca est une chaîne de caractères après formatage
}

  