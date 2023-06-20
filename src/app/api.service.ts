import { Injectable } from '@angular/core';
import {Board} from "./models/Board";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient:HttpClient,
              private cookieService:CookieService) { }

  boards: Board[] | undefined

  baseUrl = 'http://localhost:8000/'
  baseMovieUrl = `${this.baseUrl}api/movies/`
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Token e4edbf93d9acb81761144268148eefac0ccbd0f5'
  });

  getAuthHeaders() {
    const token = this.cookieService.get("mr-token")
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`,
    });
  }

  getBoards() {
    return this.httpClient.get<Board[]>(this.baseMovieUrl, {headers: this.headers});
  }
}
