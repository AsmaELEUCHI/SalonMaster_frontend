import { Component, OnInit } from '@angular/core';
import { CaService } from '../services/ca.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent implements OnInit {
  stats: any;

  constructor(private caService: CaService){}

  //Initialiser le composant avec les données de statistiques
  ngOnInit(): void {
    this.caService.getStats().subscribe({ //Requete de récupération des données de stats
      next: (data) => this.stats = data,
      error: (error) => console.error('Erreur lors de la récupération des statistiques', error)
    });
  }

  //Méthode pour formater les chiffres 
  formatCurrency(value: number): string {
    if (value !== null && value !== undefined) {
      return value.toFixed(2)  // Fixe à 2 décimales
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')  // Ajoute des espaces comme séparateurs de milliers 
    }
    return '0.00'; // Valeur par défaut si le nombre est null ou undefined
  }
}
