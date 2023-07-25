import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {ApiService} from "../api.service";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  constructor(private cookieService: CookieService,
              private router: Router,
              private apiService:ApiService) {
  }

  ngOnInit(): void {
    if (!this.apiService.getToken()) {
      this.router.navigate(['/']);
    }
  }

}
