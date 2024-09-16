import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {LoginData, ResetPasswordData, AuthResponse } from '../interfaces/auth.interface';
import { PasswordResetService } from '../services/passwordReset.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup; // Formulaire de connexion
  resetPasswordForm: FormGroup; // Formulaire de réinitialisation de mot de passe
  message: string;  // Message pour afficher le résultat de la demande de réinitialisation
  private platformId: Object; // Identifiant de la plateforme (côté client ou serveur)
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private router: Router, @Inject(PLATFORM_ID) platformId: Object, private authService: AuthService, private passwordResetService: PasswordResetService) {
    this.platformId = platformId; // Injection de l'identifiant de la plateforme
  }
  // Initialisation des formulaires avec des validations
  ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/)]]
    });

    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }


  // Fonction pour basculer la visibilité du mot de passe
  togglePasswordVisibility(password: string): void {
    // Vérification si le code s'exécute côté client (navigateur)
    if (isPlatformBrowser(this.platformId)) {
      const inputElement = document.getElementById(password) as HTMLInputElement;
      if (inputElement) {
        inputElement.type = inputElement.type === 'password' ? 'text' : 'password';
      }
    }
  }

// Fonction pour ouvrir le modal de réinitialisation de mot de passe
  openForgotPasswordModal(): void {
    // Vérification si le code s'exécute côté client (navigateur)
    if (isPlatformBrowser(this.platformId)) {
      const modalElement = document.getElementById('forgotPasswordModal');
      if (modalElement) {
        const modal = new (window as any).bootstrap.Modal(modalElement);
        modal.show();
      }
    }
  }

  // Méthode d'authentification envoyant les données de login et reçevant le token qui sera stocké dans localStorage
  onSubmit() {    
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value; // Récupération des données du formulaire
  
      this.authService.login(loginData).subscribe({  //requete d'authentification
        next: (response) => {
          const token = response.body.token;
          console.log("Token extrait avec succés");
          if (token) {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('token', token); // Stocker le token dans le localStorage
          }
          this.accessPersonalSpace(token); // Passer le token à la méthode permettant l'accès à l'espace personnel
        } else {
          console.error('Token non trouvé dans les en-têtes');
        }
      },
        error: (error) => {
          console.error('Erreur de connexion', error);
        }
      });
    } else {
      console.log('Formulaire invalide');
    }
  }
    
  //Méthode permet l'envoie de token pour vérification et accés à pesonalSpace
  accessPersonalSpace(token: string) {
    this.authService.getPersonalSpace(token).subscribe({ //Requete pour vérifier le token 
      next: (response: AuthResponse) => {
        console.log('Réponse du serveur :', response.message);
        if (response.message === "Accès à l'espace personnel autorisé.") {
          this.router.navigate(['/personalSpace']); // Redirige vers l'espace personnel
        } else {
          console.error('Message du serveur :', response.message);
        }
      },
      error: (error) => {
        console.error('Échec de l’accès à l’espace personnel', error);
      }
    });
  }

  // Fonction pour gérer la demande de réinitialisation de mot de passe
  onSendResetPasswordRequest(): void {
    if (this.resetPasswordForm.valid) {
      const email = this.resetPasswordForm.get('email')?.value;

      this.passwordResetService.resetPassword(email).subscribe({ //requete envoie l'email et reçoit un mail de rénitialisation de mot de passe
        next: (response) => {
          this.message = response; // Affiche le message de succès
          this.resetPasswordForm.reset(); // Réinitialise le formulaire
        },
        error: (error) => {
          console.error('Erreur lors de l\'envoi de la demande de réinitialisation:', error);
          this.message = 'Une erreur est survenue. Veuillez réessayer.';
        }
      });
    }
  }

   
}

