import { Component, signal } from '@angular/core';
import { Video } from '../../types/video';
import { toObservable } from '@angular/core/rxjs-interop';
import { VideoService } from '../../services/video/video.service';
import { Category } from '../../types/category.enum';
import { switchMap, tap } from 'rxjs';
import { CategoriesComponent } from './categories/categories.component';
import { VideosComponent } from './videos/videos.component';

@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.component.html',
  styleUrls: ['./trending-page.component.css'],
  imports: [CategoriesComponent, VideosComponent],
  standalone: true,
})
export class TrendingPageComponent {
  categoryChosen = signal<number | undefined>(undefined);
  categories = [
    { name: 'Music', icon: 'assets/music-icon.png', value: Category.MUSIC },
    { name: 'Sports', icon: 'assets/soccer-icon.png', value: Category.SPORTS },
    { name: 'Gaming', icon: 'assets/gaming-icon.png', value: Category.GAMING },
    {
      name: 'Movies & Shows',
      icon: 'assets/film-icon.png',
      value: Category.MOVIES_SHOWS,
    },
    { name: 'News', icon: 'assets/news-icon.png', value: Category.NEWS },
    { name: 'Live', icon: 'assets/live-icon.png', value: Category.LIVE },
  ];

  trendingVideos: Video[] = [];
  isLoadingTrendingVideos: boolean = true;

  constructor(private videoService: VideoService) {
    toObservable(this.categoryChosen)
      .pipe(
        tap(() => (this.isLoadingTrendingVideos = true)),
        switchMap((categoryIndex) => {
          if (categoryIndex === undefined) {
            return this.videoService.getTrendingVideos();
          } else
            return this.videoService.getTrendingVideos(
              this.categories[categoryIndex].value
            );
        })
      )
      .subscribe((videos) => {
        this.trendingVideos = videos;
        this.isLoadingTrendingVideos = false;
      });
  }

  onCategoryChosen(categoryIndex: number) {
    this.categoryChosen.set(categoryIndex);
  }
}
