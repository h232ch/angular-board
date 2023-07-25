import {Injectable} from '@angular/core';
import {Board} from "./models/Board";
import {HttpClient, HttpHeaders, HttpRequest} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {mergeMap, Observable, tap, throwError} from "rxjs";
import {Boards} from "./models/Boards";
import {FormControl, ɵValue} from "@angular/forms";
import {Rules} from "./models/Rules";
import {AuthService} from "./auth.service";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient,
              private cookieService: CookieService,
              private router: Router) {
  }

  private pageIndex = 0;
  private baseUrl = 'http://localhost:8000/'
  // baseUrl = 'http://100.95.192.216:8000/'
  private baseBoardUrl = `${this.baseUrl}api/movies/`
  private boardListUrl = `${this.baseUrl}api/movielist/`
  private apiUrl = 'http://localhost:8000/api/token/';
  private refreshTokenUrl = 'http://localhost:8000/api/token/refresh/';

  // Token Authorization
  // getAuthHeaders(): HttpHeaders {
  //   const token = this.cookieService.get("token")
  //   return new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Token ${token}`,
  //   });
  // }

  login(username: ɵValue<FormControl<string | null>> |
    undefined, password: ɵValue<FormControl<string | null>> | undefined): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl, {username, password});
  }

  refreshToken(refreshToken: string): Observable<any> {
    return this.httpClient.post<any>(this.refreshTokenUrl, {refresh: refreshToken});
  }

  saveToken(token: string, refreshToken: string): void {
    localStorage.setItem('jwtToken', token);
    localStorage.setItem('jwtRefreshToken', refreshToken);
  }

  saveUser(user: string) {
    localStorage.setItem('userName', user);
  }

  getUser(): string | null {
    return localStorage.getItem('userName');
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

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getBoards(page = 1, search?: ɵValue<FormControl<null>> | undefined | string): Observable<any> {
    if (search) {
      const request = this.httpClient.get<Boards>(
        `${this.boardListUrl}?page=${page}&search=${search}`, {
          headers: this.getAuthHeaders()
        })
      return request

    } else {
      const request = this.httpClient.get<Boards>(
        `${this.boardListUrl}?page=${page}`, {
          headers: this.getAuthHeaders()
        })
      return request;
    }
  }

  getBoard(id: number): Observable<any> {
    const url = `${this.baseBoardUrl}${id}`
    const request = this.httpClient.get<Board>(url, {
      headers: this.getAuthHeaders()
    })
    return request;
  }

  createdBoard(title: string, description: string, pub_date: Date): Observable<any> {
    const body = JSON.stringify({title: title, description: description, pub_date: pub_date});
    const request = this.httpClient.post(`${this.baseBoardUrl}`, body, {headers: this.getAuthHeaders()})
    return request;
  }

  updatedBoard(id: number, title: string, description: string): Observable<any> {
    const body = JSON.stringify({title: title, description: description});
    const request = this.httpClient.put(`${this.baseBoardUrl}${id}/`,
      body, {headers: this.getAuthHeaders()})
    return request;
  }

  deletedBoard(id: number): Observable<any> {
    const request = this.httpClient.delete(`${this.baseBoardUrl}${id}/`,
      {headers: this.getAuthHeaders()})
    return request;
  }

  createdComment(id: number, comment: string, pub_date: Date): Observable<any> {
    const body = JSON.stringify({movie: id, comment: comment, pub_date: pub_date});
    const request = this.httpClient.post(`${this.baseUrl}api/comments/`, body,
      {headers: this.getAuthHeaders()})
    return request;
  }

  updatedComment(id: number, comment: string): Observable<any> {
    const body = JSON.stringify({comment: comment});
    const request = this.httpClient.put(`${this.baseUrl}api/comments/${id}/`,
      body, {headers: this.getAuthHeaders()})
    return request;
  }

  deletedComment(id: number): Observable<any> {
    const request = this.httpClient.delete(`${this.baseUrl}api/comments/${id}/`,
      {headers: this.getAuthHeaders()})
    return request;
  }

  registerUser(authData: any): Observable<any> {
    const body = JSON.stringify({username: authData.username, password: authData.password});
    return this.httpClient.post(`${this.baseUrl}api/users/`,
      body, {headers: this.getAuthHeaders()});
  }

  pageIndexSet(page: number) {
    this.pageIndex = page;
  }

  pageIndexGet() {
    return this.pageIndex;
  }

  getRules(src?: ɵValue<FormControl<null>> | undefined |
    string, dst?: ɵValue<FormControl<null>> | string, port?: ɵValue<FormControl<null>> |
    undefined | string): Observable<any> {
    if (src || dst || port) {
      const request = this.httpClient.get<Rules>(`${this.baseUrl}api/rule?src=${src}&dst=${dst}&port=${port}`,
        {headers: this.getAuthHeaders()})
      return request;
    } else {
      const request = this.httpClient.get<any>(`${this.baseUrl}api/rule/`,
        {headers: this.getAuthHeaders()})
      return request;
    }
  }

  getLoginUser() {
    const request = this.httpClient.get<Boards>(`${this.apiUrl}user/`,
      { headers: this.getAuthHeaders()})
    return request;
  }

  // Token Authorization
  // loginUser(authData: any) {
  //   const body = JSON.stringify({username: authData.username, password: authData.password});
  //   return this.httpClient.post(`${this.baseUrl}api/auth/`, body, {headers: this.getAuthHeaders()});
  // }
}
