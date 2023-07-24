import { Injectable } from '@angular/core';
import {Board} from "./models/Board";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {tap} from "rxjs";
import {Boards} from "./models/Boards";
import {FormControl, ɵValue} from "@angular/forms";
import {Rules} from "./models/Rules";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient:HttpClient,
              private cookieService:CookieService) { }

  pageIndex = 0;

  baseUrl = 'http://localhost:8000/'
  // baseUrl = 'http://100.95.192.216:8000/'
  baseBoardUrl = `${this.baseUrl}api/movies/`
  boardListUrl = `${this.baseUrl}api/movielist/`
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Token e4edbf93d9acb81761144268148eefac0ccbd0f5'
  });

  getAuthHeaders(): HttpHeaders {
    const token = this.cookieService.get("token")
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`,
    });
  }

  getBoards(page=1, search?: ɵValue<FormControl<null>> | undefined| string) {
    if (search) {
      return this.httpClient.get<Boards>(`${this.boardListUrl}?page=${page}&search=${search}`, {headers: this.getAuthHeaders()});
    } else {
      return this.httpClient.get<Boards>(`${this.boardListUrl}?page=${page}`,{headers: this.getAuthHeaders()});
    }
  }

  getBoard(id:number) {
    const url = `${this.baseBoardUrl}${id}`
    return this.httpClient.get<Board>(url, {headers: this.getAuthHeaders()})
  }

  createdBoard(title: string, description: string, pub_date: Date) {
    const body = JSON.stringify({title: title, description: description, pub_date: pub_date});
    return this.httpClient.post(`${this.baseBoardUrl}`, body, {headers: this.getAuthHeaders()})
  }

  updatedBoard(id:number, title:string, description:string) {
    const body = JSON.stringify({title: title, description: description});
    return this.httpClient.put(`${this.baseBoardUrl}${id}/`, body, {headers: this.getAuthHeaders()})
  }

  deletedBoard(id: number) {
    return this.httpClient.delete(`${this.baseBoardUrl}${id}/`, {headers: this.getAuthHeaders()});
  }

  getBoardsPage(pageIndex: number, search?: string) {
    if (search) {
      const body = JSON.stringify({search: search});
      const url = `${this.boardListUrl}?page=${pageIndex}`;
      return this.httpClient.post<Boards>(url, body, {headers: this.getAuthHeaders()});
    } else {
      const url = `${this.boardListUrl}?page=${pageIndex}`;
      return this.httpClient.get<Boards>(url, {headers: this.getAuthHeaders()})
    }
  }

  createdComment(id: number, comment: string, pub_date: Date) {
    const body = JSON.stringify({movie: id, comment: comment, pub_date: pub_date});
    return this.httpClient.post(`${this.baseUrl}api/comments/`, body, {headers: this.getAuthHeaders()})
  }

  updatedComment(id: number, comment: string) {
    const body = JSON.stringify({comment: comment});
    return this.httpClient.put(`${this.baseUrl}api/comments/${id}/`, body, {headers: this.getAuthHeaders()})
  }

  deletedComment(id: number) {
    return this.httpClient.delete(`${this.baseUrl}api/comments/${id}/`, {headers: this.getAuthHeaders()});
  }

  loginUser(authData: any) {
    const body = JSON.stringify({username: authData.username, password: authData.password});
    return this.httpClient.post(`${this.baseUrl}api/auth/`, body, {headers: this.getAuthHeaders()});
  }

  registerUser(authData: any) {
    const body = JSON.stringify({username: authData.username, password: authData.password});
    return this.httpClient.post(`${this.baseUrl}api/users/`, body, {headers: this.getAuthHeaders()})
  }

  pageIndexSet(page: number) {
    this.pageIndex = page;
  }

  pageIndexGet() {
    return this.pageIndex;
  }

  getRules(src?: ɵValue<FormControl<null>> | undefined |
    string, dst?: ɵValue<FormControl<null>> | string, port?: ɵValue<FormControl<null>> |
    undefined | string) {
    if (src || dst || port) {
      return this.httpClient.get<Rules>(`${this.baseUrl}api/rule?src=${src}&dst=${dst}&port=${port}`, {headers: this.getAuthHeaders()});
    } else {
      return this.httpClient.get<any>(`${this.baseUrl}api/rule/`, {headers: this.getAuthHeaders()});
    }
  }
}
