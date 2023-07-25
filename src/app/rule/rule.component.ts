import {Component, OnInit} from '@angular/core';
import {ApiService} from "../api.service";
import {Rules} from "../models/Rules";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.css']
})
export class RuleComponent implements OnInit {

  rules!:Rules;

  constructor(private apiService: ApiService,
              private cookieService: CookieService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (!this.apiService.getToken()) {
      this.router.navigate(['/']);
    }
    this.apiService.getRules().subscribe(
      (result: Rules) => {
        this.rules = result;
      }
    );
    this.apiService.pageIndexSet(0);
  }
}
