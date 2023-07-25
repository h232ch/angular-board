import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ApiService} from "../api.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {error} from "@angular/compiler-cli/src/transformers/util";

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

  // Token authentication

  // saveForm() {
  //   if (!this.registerMode) {
  //     this.apiService.loginUser(this.authForm.value).subscribe(
  //       (result: any) => {
  //         this.cookieService.set('token', result.token);
  //         this.cookieService.set('username', result.username);
  //         this.router.navigate(['/']);
  //       }, error => {
  //         if (error.status == 400) {
  //           this.loginFailMsg = true;
  //         }
  //       }
  //     )
  //   } else {
  //     this.apiService.registerUser(this.authForm.value).subscribe(
  //       (result: any) => {
  //         this.router.navigate(['/auth']);
  //         this.registerMode = false;
  //       }
  //     );
  //   }
  // }

  // Jwt Authentication
  saveForm() {
    if (!this.registerMode) {
      this.apiService.login(this.authForm.value.username,
        this.authForm.value.password).subscribe(
        (result) => {
          if (result.access) {
            this.apiService.saveToken(result.access, result.refresh);

            this.apiService.getLoginUser().subscribe(
              (result: any) => {
                this.apiService.saveUser(result.user)
              }, error => {
                console.log(error)
              }
            );
            this.router.navigate(['/']);
          }
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
