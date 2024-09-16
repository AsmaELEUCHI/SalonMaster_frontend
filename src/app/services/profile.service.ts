import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { Observable, of } from "rxjs";
import { tap, map } from 'rxjs/operators';
import { RegisterData, LoginData, ResetPasswordData, AuthResponse } from "../interfaces/auth.interface";
import { UserProfileDto,UpdateResponse } from "../interfaces/profile.interface";
import { isPlatformBrowser } from '@angular/common';



@Injectable({
  providedIn : 'root'
})

export class ProfileService {
  private urlAuth = 'http://localhost:8080/api/users';
  
  constructor(private http: HttpClient,  @Inject(PLATFORM_ID) private platformId: Object) {}

  // Requete pour récupérer les données du salon pour les afficher dans le formulaire du profile
  getProfile(): Observable<UpdateResponse> {
    let token: string | null = null;
    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('token');
    }
    if (!token) {
      // Gérer le cas où le token n'est pas disponible
      return of(null); // ou gérer autrement
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<UpdateResponse>(`${this.urlAuth}/profile`, { headers });
  }
 
  //Requete pour méttre à jour les données du profile dans db
  updateProfile(userProfileDto: UserProfileDto): Observable<UpdateResponse> {
    let token: string | null = null;
    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('token');
    }
    if (!token) {
      // Gérer le cas où le token n'est pas disponible
      return of(null); // ou gérer autrement
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<UpdateResponse>(`${this.urlAuth}/profile`, userProfileDto, { headers });
  }
}