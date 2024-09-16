import { Component, OnInit } from '@angular/core';
import { UserProfileDto } from '../interfaces/profile.interface';
import { ProfileService } from '../services/profile.service';
import { Router } from '@angular/router';
import { UpdateResponse } from '../interfaces/profile.interface';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  salonName: string = '';
  salonAddress: string = '';
  openingDate: string = '';
  numberOfEmployees: number;
  region: string = '';
  departement : string = '';

  constructor(private profileService : ProfileService,  private router: Router){}

  ngOnInit(): void {
      this.getProfile(); //Initialisation du formulaire de profile avec les données du salon
  }

  //Méthode convertie les entités html en texte lisible (exemple ("&#39;", "'"))
  unescapeHtml(html: string): string {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }
  
//En cliquant sur submit on met à jour le profile dans la base de donnée, on appelle la méthode qui affiche les données dans l'interface et on recharge la  page
  onSubmit(){
    const userProfileDto: UserProfileDto={
      salonName: this.salonName,
      salonAddress: this.salonAddress,
      numberOfEmployees: this.numberOfEmployees,
      openingDate: this.openingDate,
      region: this.region,
      departement: this.departement

    };
    this.profileService.updateProfile(userProfileDto).subscribe({ //Requete qui envoie les données à db
      next:(response)=> {
        console.log('Profil mis à jour avec succès', response);
        this.getProfile(); //Affichage des données dans l'interface
        window.location.reload();
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du profil', error);
      }
    })
  }

 // Méthode pour afficher les données du salon dans le formulaire du profile 
  getProfile(): void {
    this.profileService.getProfile().subscribe({ //Requete demandant les données du salon
      next: (response: UpdateResponse) => {
        if (response && response.salon) {
          this.salonName = this.unescapeHtml(response.salon.salonName || '');
          this.salonAddress = this.unescapeHtml(response.salon.salonAddress || '');
          this.openingDate = response.salon.openingDate || '';
          this.numberOfEmployees = response.salon.numberOfEmployees || 0;
          this.region = this.unescapeHtml(response.salon.region || '');
          this.departement = this.unescapeHtml(response.salon.departement || '');
        } else {
          console.error('Salon ou profil non trouvé dans la réponse');
        }
      },
      error: (error) => {
        console.error('Erreur lors de la récupération du profil', error);
      }
    });
  }
}
