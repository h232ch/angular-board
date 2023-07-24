import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ApiService} from "../api.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{

  constructor(private apiService: ApiService,
              private cookieService: CookieService,
              private router: Router) {}

  ngOnInit(): void {
    const token = this.cookieService.get('token');
    if (token) {
      this.router.navigate(['/board']);
    }
    this.loginFailMsg = false;
  }

  authForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  })

  registerMode:boolean = false;
  loginFailMsg!:boolean;

  saveForm() {
    if (!this.registerMode) {
      this.apiService.loginUser(this.authForm.value).subscribe(
        (result: any) => {
          this.cookieService.set('token', result.token);
          this.cookieService.set('username', result.username);
          this.router.navigate(['/rule']);
        }, error => {
          if (error.status == 400) {
            this.loginFailMsg = true;
          }
        }
      )
    } else {
      this.apiService.registerUser(this.authForm.value).subscribe(
        (result: any) => {
          this.router.navigate(['/auth']);
          this.registerMode = false;
        }
      );
    }
  }

}
