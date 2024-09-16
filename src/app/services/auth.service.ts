import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { Observable } from "rxjs";
import { RegisterData, LoginData, ResetPasswordData, AuthResponse } from "../interfaces/auth.interface";


@Injectable({
  providedIn : 'root'
})

export class AuthService {
  private urlAuth = 'http://localhost:8080/api/users';
  
    constructor(private http: HttpClient) {}

  //Requete d'envoie des données de connexion
  login(loginData: LoginData): Observable<any> {
      return this.http.post<any>(`${this.urlAuth}/login`, loginData, { observe: 'response' });
    }
  
  //Requete d'envoie de token pour vérification pour pouvoir accéder à personalSpace
  getPersonalSpace(token: string): Observable<AuthResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<AuthResponse>(`${this.urlAuth}/personalSpace`, {}, { headers });
  }
}
    

