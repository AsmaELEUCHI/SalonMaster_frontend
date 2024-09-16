import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { InscService } from '../services/insc.service';
import { RegisterData, AuthResponse } from '../interfaces/auth.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  registerForm: FormGroup; // formulaire d'enregistrement
  message: string;  // Message pour afficher le résultat de la demande de réinitialisation
  private platformId: Object; // Identifiant de la plateforme (côté client ou serveur)

  constructor(private formBuilder: FormBuilder, private router: Router, @Inject(PLATFORM_ID) platformId: Object, private inscService: InscService) {
    this.platformId = platformId; // Injection de l'identifiant de la plateforme
  }
// Initialisation des formulaires avec des validations
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      salonName: ['', Validators.required], // Champ obligatoire
      representativeFirstName: ['', Validators.required],
      representativeLastName: ['', Validators.required],
      salonAddress: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/)]],
      confirmPassword: ['', Validators.required]
    }, { validators: passwordMatchValidator });

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

//Méthode permet l'envoie des données d'inscription dans db et la redirection vers la page demandant à l'utilisateur de consulter sa boite email pour confirmer le compte
  onSubmit() {
    if (this.registerForm.valid) {
      const registerData = this.registerForm.value;

      this.inscService.register(registerData).subscribe({ //Requete d'envoie de donnée
        next: (response: AuthResponse) => {
          if (response.message) {
            this.message = response.message; 
          }
          this.router.navigate(['/thanks']); // Redirection vers la page "thanks"
        },
        error: (error) => {
          console.error('Erreur lors de l\'inscription:', error);
          this.message = 'Une erreur est survenue. Veuillez réessayer.';
        }
      });
    }
  }
}

// Fonction de validation personnalisée pour vérifier si les mots de passe correspondent
export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { mismatch: true };
  
}
