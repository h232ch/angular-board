import {Component, OnInit} from '@angular/core';
import {Board} from "../models/Board";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  constructor(private cookieService: CookieService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (!this.cookieService.get('username')) {
      this.router.navigate(['/']);
    }
  }

}
