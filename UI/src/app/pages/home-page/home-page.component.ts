import { Component, OnInit } from '@angular/core';
import { Video } from '../../types/video';
import { ListVideosSummaryComponent } from './list-videos-summary/list-videos-summary.component';
import { HomeService } from '../../services/side-nav-options/home/home.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ListVideosSummaryComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  recommendedVideos: Video[] = [];
  isLoadingRecommendedVideos: boolean = true;
  trendingVideos: Video[] = [];
  isLoadingTrendingVideos: boolean = true;

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.homeService.getRecommendedVideos().subscribe({
      next: (videos) => {
        this.recommendedVideos = videos;
        console.log('videso', videos);
        this.isLoadingRecommendedVideos = false;
      },
      error: (error) => {
        console.error(
          'An error occurred while fetching recommended videos:',
          error
        );
      },
    });

    this.homeService.getTrendingVideos().subscribe((videos) => {
      this.trendingVideos = videos;
      this.isLoadingTrendingVideos = false;
    });
  }
}
