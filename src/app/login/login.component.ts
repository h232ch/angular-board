// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService) {}
  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        if (response.access) {
          this.authService.saveToken(response.access, response.refresh);
          // Redirect to a secure page or do any other necessary actions
        }
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }
}
