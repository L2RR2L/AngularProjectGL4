import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NotAuthenticatedState, SideNavOption, SideNavOptionService } from '../../../types/side-nav-option';
import { HttpClient } from '@angular/common/http';
import { API } from '../../../api';
import { History } from '../../../types/history';

interface AuthenticatedState {
  type: 'authenticated';
  // add needed fields when authenticated
}

export type HistoryState = AuthenticatedState | NotAuthenticatedState;

@Injectable({
  providedIn: 'root',
})
export class HistoryService extends SideNavOptionService {
  historyOption: SideNavOption;

  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient
  ) {
    super();
    this.historyOption = {
      svg: this.sanitizer.bypassSecurityTrustHtml(`<svg viewBox="0 0 24 24" class="w-full h-full">
                      <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"></path>
                    </svg>`),
      name: 'History',
      path: '/history',
      notAuthenticatedTitle: 'Keep track of what you watch',
      notAuthenticatedSubtitle: `Watch history isn't viewable when signed out`
    };
  }

  override getSideNavOption(): SideNavOption {
    return this.historyOption;
  }

  getMyHistory() {
    return this.http.get<History[]>(API.GetHistoryByUserId());
  }


  addVideoToHistory(videoId: string) {
    return this.http.post(API.AddVideoToHistory(), { videoId });
  }

  saveVideoToHistory(videoId: string) {
    this.addVideoToHistory(videoId).subscribe({
      next: () => console.log('Video added to history'),
      error: (err) => console.error('Failed to add video to history', err)
    });
  }

}
