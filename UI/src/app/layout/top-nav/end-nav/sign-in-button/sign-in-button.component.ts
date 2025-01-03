import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-sign-in-button',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './sign-in-button.component.html',
  styleUrl: './sign-in-button.component.css',
})
export class SignInButtonComponent {
  authService = inject(AuthService);

  login() {
    this.authService.login();
  }
}
