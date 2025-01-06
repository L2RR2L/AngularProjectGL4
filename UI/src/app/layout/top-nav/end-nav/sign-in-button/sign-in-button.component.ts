import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-sign-in-button',
  standalone: true,
  imports: [],
  templateUrl: './sign-in-button.component.html',
  styleUrl: './sign-in-button.component.css',
})
export class SignInButtonComponent {

  constructor(private authService: AuthService) { }
  login() {
    this.authService.login();
  }
}
