import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordResetService } from '../services/passwordReset.service';
import { MessageResponse } from '../interfaces/message.interface';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css'
})
export class UpdatePasswordComponent implements OnInit{
  resetPasswordForm: FormGroup;
  token: string | null = null;
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private passwordResetService: PasswordResetService,
    private router: Router
  ) {
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

//Récupérer le token de l'url
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      console.log(this.token);
    });
  }

  //Méthode permettant l'envoi du token pour vérification et changer le mot de passe
  //Permet la redirection vers la page de login
  onSubmit(): void {
    if (this.resetPasswordForm.valid && this.token) {
      const newPassword = this.resetPasswordForm.get('newPassword')?.value;
      this.passwordResetService.updatePassword(this.token, newPassword).subscribe({
        next: (response: MessageResponse) => {
          console.log(response.message);
          
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour du mot de passe', error);
        }
      });
    }
  }
  
}






