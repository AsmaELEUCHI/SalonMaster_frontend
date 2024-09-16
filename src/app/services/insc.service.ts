import { Injectable } from "@angular/core";
import { HttpClient,  HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { RegisterData, LoginData, ResetPasswordData, AuthResponse } from "../interfaces/auth.interface";

@Injectable({
  providedIn : 'root'
})

export class InscService{

  private urlInsc= 'http://localhost:8080/api/users'
  constructor(private http: HttpClient){}

//Requete pour envoie des données d'inscription
  register(registerData: RegisterData): Observable<AuthResponse>{
      return this.http.post<AuthResponse>(`${this.urlInsc}/register`, registerData)
  }

  //Requete pour confirmer le compte suite à l'inscription
  confirm(token: string): Observable<any> {
    // Ajouter le token comme paramètre de requête
    const params = new HttpParams().set('token', token);
    return this.http.get<any>(`${this.urlInsc}/confirm`, { params });
  }
}