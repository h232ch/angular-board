import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {ApiService} from "./api.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Angular publish test page';

  constructor(private cookieService: CookieService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  loggedIn() {
    return this.cookieService.get('token')
  }

  logout() {
    this.cookieService.delete('token');
    this.cookieService.delete('username')
    this.router.navigate(['/'])
  }
}
