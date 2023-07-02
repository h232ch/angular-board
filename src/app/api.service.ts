import { Injectable } from '@angular/core';
import {Board} from "./models/Board";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {tap} from "rxjs";
import {Boards} from "./models/Boards";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient:HttpClient,
              private cookieService:CookieService) { }

  boards?: Board[]

  baseUrl = 'http://localhost:8000/'
  baseMovieUrl = `${this.baseUrl}api/movies/`
  movieListBaseUrl = `${this.baseUrl}api/movielist/`
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
    return this.httpClient.get<Boards>(this.movieListBaseUrl, {headers: this.headers});
  }

  getBoard(id:number) {
    const url = `${this.baseMovieUrl}${id}`
    // return this.httpClient.get<Board>(url, {headers: this.headers});
    return this.httpClient.get<Board>(url, {headers: this.headers})
  }

  createdBoard(title: string, description: string, pub_date: Date) {
    const body = JSON.stringify({title: title, description: description, pub_date: pub_date});
    return this.httpClient.post(`${this.baseMovieUrl}`, body, {headers: this.headers})
  }

  updatedBoard(id:number, title:string, description:string) {
    const body = JSON.stringify({title: title, description: description});
    return this.httpClient.put(`${this.baseMovieUrl}${id}/`, body, {headers: this.headers})
  }

  deletedBoard(id: number) {
    return this.httpClient.delete(`${this.baseMovieUrl}${id}/`, {headers: this.headers});
  }

  getBoardsPage(pageIndex: number) {
    const url = `${this.movieListBaseUrl}?page=${pageIndex}`
    return this.httpClient.get<Boards>(url, {headers: this.headers})
  }

  createdComment(id: number, comment: string, pub_date: Date) {
    const body = JSON.stringify({movie: id, comment: comment, pub_date: pub_date});
    return this.httpClient.post(`${this.baseUrl}api/comments/`, body, {headers: this.headers})
  }

  updatedComment(id: number, comment: string) {
    const body = JSON.stringify({comment: comment});
    return this.httpClient.put(`${this.baseUrl}api/comments/${id}/`, body, {headers: this.headers})
  }

  deletedComment(id: number) {
    return this.httpClient.delete(`${this.baseUrl}api/comments/${id}/`, {headers: this.headers});
  }
}
