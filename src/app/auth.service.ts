// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/token/';
  private refreshTokenUrl = 'http://localhost:8000/api/token/refresh/';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
  return this.http.post<any>(this.apiUrl, { username, password });
  }

  refreshToken(refreshToken: string): Observable<any> {
    return this.http.post<any>(this.refreshTokenUrl, { refresh: refreshToken });
  }

  saveToken(token: string, refreshToken: string): void {
    localStorage.setItem('jwtToken', token);
    localStorage.setItem('jwtRefreshToken', refreshToken);
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('jwtRefreshToken');
  }

  removeTokens(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('jwtRefreshToken');
  }


}
