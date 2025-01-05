import { Component, inject } from '@angular/core';
import { Video } from '../../types/video';
import { ListVideosSummaryComponent } from './list-videos-summary/list-videos-summary.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ListVideosSummaryComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  recommendedVideos: Video[] = [];
  isLoadingRecommendedVideos: boolean = true;
  trendingVideos: Video[] = [];
  isLoadingTrendingVideos: boolean = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<{ videos: Video[] }>('/api/videos/recommended').subscribe({
      next: (data) => {
        this.recommendedVideos = data.videos;
        this.isLoadingRecommendedVideos = false;
      },
      error: (error) => {
        console.error(
          'An error occurred while fetching recommended videos:',
          error
        );
      },
    });

    this.http
      .get<{ videos: Video[] }>('/api/videos/trending')
      .subscribe((data) => {
        this.trendingVideos = data.videos;
        this.isLoadingTrendingVideos = false;
      });
  }
}
