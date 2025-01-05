import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SideNavOption, SideNavOptionService } from '../../../types/side-nav-option';
import { HttpClient } from '@angular/common/http';
import { Video } from '../../../types/video';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SubscriptionService extends SideNavOptionService {
    subscriptionOption: SideNavOption;

    constructor(private sanitizer: DomSanitizer, private http: HttpClient) {
        super();
        this.subscriptionOption = {
            svg: this.sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-full h-full">
                  <path clip-rule="evenodd" d="M4 4.5A1.5 1.5 0 015.5 3h13A1.5 1.5 0 0120 4.5H4Zm16.5 3h-17v11h17v-11ZM3.5 6A1.5 1.5 0 002 7.5v11A1.5 1.5 0 003.5 20h17a1.5 1.5 0 001.5-1.5v-11A1.5 1.5 0 0020.5 6h-17Zm7.257 4.454a.5.5 0 00-.757.43v4.233a.5.5 0 00.757.429L15 13l-4.243-2.546Z" fill-rule="evenodd"></path>
                </svg>`),
            name: 'Subscriptions',
            path: '/subscriptions',
            notAuthenticatedTitle: `Don't miss new videos`,
            notAuthenticatedSubtitle: 'Sign in to see updates from your favorite YouTube channels'
        };
    }

    override getSideNavOption(): SideNavOption {
        return this.subscriptionOption;
    }

    getSubscriptionVideos(): Observable<Video[]> {
        return this.http.get<Video[]>('/api/videos/subscription');
    }
}