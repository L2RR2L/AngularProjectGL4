import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  SideNavOption,
  SideNavOptionService,
} from '../../../types/side-nav-option';
import { Video } from '../../../types/video';
import { Observable } from 'rxjs';
import { VideoService } from '../../video/video.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService extends SideNavOptionService {
  homeOption: SideNavOption;

  constructor(
    private sanitizer: DomSanitizer,
    private videoService: VideoService
  ) {
    super();
    this.homeOption = {
      svg: this.sanitizer
        .bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>`),
      name: 'Home',
      path: '/',
    };
  }

  override getSideNavOption(): SideNavOption {
    return this.homeOption;
  }

  getRecommendedVideos(): Observable<Video[]> {
    return this.videoService.getRecommendedVideos();
  }

  getTrendingVideos(): Observable<Video[]> {
    return this.videoService.getTrendingVideos();
  }
}
