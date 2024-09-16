import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InscService } from '../services/insc.service';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrl: './confirm-account.component.css'
})
export class ConfirmAccountComponent {
  message: string;

  constructor(
    private route: ActivatedRoute,
    private inscService: InscService,
    private router: Router
  ) { }

  // En cliquant sur le lien, une redirection de page se produit vers le path /confirm avec le token en paramétre
  //La méthode permet d'extraction du token et le passer à la requete responsable sur l'activation de compte 
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        this.inscService.confirm(token).subscribe({ //Requete qui active le compte 
          next: (response) => {
            this.message = 'Votre compte a été confirmé avec succès.';
          },
          error: (error) => {
            this.message = 'Erreur lors de la confirmation.';
          }
        });
      } else {
        this.message = 'Token manquant.';
      }
    });
  }
}


