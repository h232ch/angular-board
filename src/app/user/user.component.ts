import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  constructor(private cookieService:CookieService) {
  }
  username!:string;
  ngOnInit(): void {
    this.username = this.cookieService.get('username');
  }

}
