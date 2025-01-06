import { Injectable } from '@angular/core';
import { API } from '../../api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(): void {
    window.location.assign(API.Login());
  }
}
