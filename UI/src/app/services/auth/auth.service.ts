import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Channel } from '../../types/channel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private channelSubject = new BehaviorSubject<Channel | null>(null);
  channel$ = this.channelSubject.asObservable();

  constructor(private http: HttpClient) {}

  checkAuthStatus(): void {
    this.http
      .get<Channel | null>(`${environment.apiURL}/api/channels/owner`, {
        withCredentials: true,
      })
      .subscribe((data) => {
        console.log('data');
        // this.isAuthenticatedSubject.next(response.isAuthenticated);
        // this.channelSubject.next(response.channel);
      });
  }

  login(): void {
    window.location.assign(`${environment.apiURL}/api/auth/google`);
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
    this.channelSubject.next(null);
  }
}
