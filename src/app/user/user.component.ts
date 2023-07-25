import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {ApiService} from "../api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  username!:string | null;
  constructor(private apiService: ApiService,
              private cookieService: CookieService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (!this.apiService.getToken()) {
      this.router.navigate(['/']);
    }
    this.username = this.apiService.getUser()
    this.apiService.pageIndexSet(0);
  }
}
