// src/app/secure/secure.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit {
  message = '';

  constructor(private authService: AuthService,
              private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchSecret();
  }

  fetchSecret(): void {
    const token = this.authService.getToken();

    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      console.log(headers.get('Authorization'))

      this.http.get<any>('http://localhost:8000/api/secret/', { headers }).pipe(
        catchError((error) => {
          if (error.status === 401) {
            return this.handleUnauthorizedError();
          }
          return throwError(error);
        })
      ).subscribe(
        (response) => {
          this.message = response.message;
          console.log(this.message)
        },
        (error) => {
          console.error('Failed to fetch secret:', error);
        }
      );
    }
  }

  handleUnauthorizedError(): any {
    const refreshToken = this.authService.getRefreshToken();

    if (refreshToken) {
      return this.authService.refreshToken(refreshToken).pipe(
        catchError((error) => {
          console.error('Failed to refresh token:', error);
          this.authService.removeTokens();
          // Redirect to login page or show an error message
          return throwError('Authorization failed. Please log in again.');
        })
      ).subscribe(
        (response) => {
          if (response.access) {
            this.authService.saveToken(response.access, refreshToken);
            this.fetchSecret(); // Retry fetching the secret after token refresh
          } else {
            this.authService.removeTokens();
            // Redirect to login page or show an error message
            throwError('Authorization failed. Please log in again.');
          }
        }
      );
    } else {
      // Redirect to login page or show an error message
      return throwError('Authorization failed. Please log in again.');
    }
  }
}
