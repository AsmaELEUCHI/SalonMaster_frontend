import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { CaDto } from '../interfaces/ca.interface';
import { isPlatformBrowser } from '@angular/common';
import { MessageResponse } from '../interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})
export class CaService {

  private apiUrl = 'http://localhost:8080/api/ca';
  
  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  // Méthode privée pour récupérer les headers avec le token
  private getHeaders(): HttpHeaders | null {
    let token: string | null = null;
    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('token');
    }
    if (!token) {
      return null; 
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  //Requete pour sauvegarder les chiffres d'affaires dans db
  saveCa(caDto: CaDto): Observable<MessageResponse> {
    const headers = this.getHeaders();
    if (!headers) {
      return of(null);
    }
    return this.http.post<MessageResponse>(`${this.apiUrl}/save`, caDto, { headers });
  }

  //Requete pour récupérer les données de chiffres d'affaires
  getHistorique(): Observable<CaDto[]> {
    const headers = this.getHeaders();
    if (!headers) {
          return of([]); 
    }
    return this.http.get<CaDto[]>(`${this.apiUrl}/history`, { headers });
  }

  //Requete pour supprimer les données de chiffres d'affaires du tableau
  deleteCa(caId: number): Observable<MessageResponse> {
    const headers = this.getHeaders();
    if (!headers) {
         return of(null); 
    }
    return this.http.delete<MessageResponse>(`${this.apiUrl}/history/${caId}`, { headers });
  }

  //Requete pour récupérer les statistiques des chiffres d'affaires
  getStats(): Observable<any> {
    const headers = this.getHeaders();
    if (!headers) {
          return of(null); 
    }
    return this.http.get<any>(`${this.apiUrl}/stats`, { headers });
  }
}
