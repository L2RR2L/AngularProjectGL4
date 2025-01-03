import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';
import { Channel } from '../../../types/channel';

@Component({
  selector: 'app-end-nav',
  standalone: true,
  providers: [AuthService],
  templateUrl: './end-nav.component.html',
  styleUrl: './end-nav.component.css',
})
export class EndNavComponent {
  isAuthenticated: boolean = false;
  channel: Channel | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe(
      (isAuth) => (this.isAuthenticated = isAuth)
    );

    this.authService.channel$.subscribe();

    this.authService.checkAuthStatus();
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
