import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageResponse } from '../interfaces/message.interface';

@Injectable({
    providedIn: 'root'
  })

  export class PasswordResetService {
    private apiUrl = 'http://localhost:8080/api/users';

    constructor(private http: HttpClient) {}

    //Requete pour demander la renitialisation de mot de passe et pour reçevoir un email de renitialisation 
    resetPassword(email: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/reset-password`, { email });
      }

    //Requete pour l'envoie du token avec le nouveau password
    updatePassword(token: string, newPassword: string): Observable<MessageResponse> {
      return this.http.post<MessageResponse>(`${this.apiUrl}/update-password?token=${token}`, { newPassword });
    }

  }