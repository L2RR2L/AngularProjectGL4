import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(): void {
    window.location.assign(`${environment.apiURL}/api/auth/google`);
  }
}
