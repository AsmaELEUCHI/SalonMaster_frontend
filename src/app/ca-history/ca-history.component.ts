import { Component, OnInit } from '@angular/core';
import { CaDto } from '../interfaces/ca.interface';
import { CaService } from '../services/ca.service';
import { FormattedCaDto } from '../interfaces/ca.interface';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { MessageResponse } from '../interfaces/message.interface';


@Component({
  selector: 'app-ca-history',
  templateUrl: './ca-history.component.html',
  styleUrl: './ca-history.component.css'
})
export class CaHistoryComponent implements OnInit{
  mois: string;
  annee: number;
  ca: number;
  id:number
  historique: CaDto[] = [];
  formattedHistorique: FormattedCaDto[] = [];
  private monthToNumber(month: string): number {
    const months = {
        'Janvier': 1,
        'Février': 2,
        'Mars': 3,
        'Avril': 4,
        'Mai': 5,
        'Juin': 6,
        'Juillet': 7,
        'Août': 8,
        'Septembre': 9,
        'Octobre': 10,
        'Novembre': 11,
        'Décembre': 12
    };
    return months[month] || 0; 
}


 constructor(private caService: CaService, private router: Router,private cdr: ChangeDetectorRef) { }

 ngOnInit(): void {
  this.loadHistorique(); // Charger l'historique dès le chargement initial du composant(quand on accéde à la page personalSpace)
}

//En cliquant sur le bouton, on sauvegarde les données dans db et on apelle la méthode responsable à l'affichage des données
onSubmit(): void {
  const caDto: CaDto = {
    mois: this.mois,
    annee: this.annee,
    ca: this.ca,
    id: this.id
  };

  this.caService.saveCa(caDto).subscribe({  // la requete de sauvegarde de données
    next: (response: MessageResponse) => {
      if (response) {
        this.loadHistorique(); // Recharge l'historique après la soumission
        window.location.reload();
      }
    },
    error: (error) => {
      console.error('Erreur lors de l\'enregistrement de Chiffre d\'affaires', error);
    }
  });
}

//Méthode pour l'affichage des chiffres d'affaires dans le tableau 
loadHistorique(): void {
  this.caService.getHistorique().subscribe({ // la requete de récupération de données
    next: (data) => {
      this.historique = data
        .sort((a, b) => {
          if (a.annee !== b.annee) {
            return a.annee - b.annee; // Tri par année
          }
          return this.monthToNumber(a.mois) - this.monthToNumber(b.mois); // Tri par mois
        });
      console.log('Récupération de l\'historique réussie');
    },
    error: (err) => {
      console.error('Erreur lors de la récupération de l\'historique', err);
    }
  });
}

//Méthode pour formater les chiffres d'affaires
formatCurrency(value: number): string {
  if (value !== null && value !== undefined) {
    return value.toFixed(2)  // Fixe à 2 décimales
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')  // Ajoute des espaces comme séparateurs de milliers
     
  }
  return '0.00'; // Valeur par défaut si le nombre est null ou undefined
}

//Méthode pour supprimer les chiffres d'affaires du tableau
deleteCa(id: number): void {
  this.caService.deleteCa(id).subscribe({  //Requete pour supprimer le chiffre d'affaires dans db
    next: (response: MessageResponse) => {
      this.historique = this.historique.filter(entry => entry.id !== id);  // Supprime l'entrée du tableau sur l'interface
      window.location.reload();
    },
    error: (err) => {
      console.error('Erreur lors de la suppression', err);
    }
  });
}

}
