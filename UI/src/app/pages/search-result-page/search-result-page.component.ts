import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, filter, fromEvent, map, mergeMap, tap } from 'rxjs';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { Video } from '../../types/video';
import { VideoService } from '../../services/video/video.service';
import { environment } from '../../../environments/environment';
import { ListVideosSummaryComponent } from '../home-page/list-videos-summary/list-videos-summary.component';

@Component({
  selector: 'app-search-result-page',
  standalone: true,
  imports: [SpinnerComponent, ListVideosSummaryComponent],
  templateUrl: './search-result-page.component.html',
  styleUrls: ['./search-result-page.component.css'],
})
export class SearchResultPageComponent {
  @ViewChild('seeMoreButton') seeMoreButton!: ElementRef<HTMLButtonElement>;

  searchQuery: string = '';
  searchedVideos: any[] = [];
  loadingSearchingVideos = false;
  offset = 0;
  VIDEOS_LIMIT = 10;

  constructor(
    private activatedRoute: ActivatedRoute,
    private videoService: VideoService
  ) {}

  ngOnInit(): void {
    // Get the search query from the route params
    this.activatedRoute.params.subscribe((params) => {
      this.searchQuery = params['search_query'];
      this.loadingSearchingVideos = true;

      this.videoService
        .getVideosBySearch(this.searchQuery, 0, this.VIDEOS_LIMIT)
        .subscribe((videos) => {
          this.searchedVideos = videos.map((video: any) => ({
            ...video,
            thumbnailLink: `${environment.apiURL}/api/videos/thumbnail/${video.thumbnailFilename}`,
          }));
          this.loadingSearchingVideos = false;
        });
    });
  }

  searchVideos(): void {}

  handleSeeMore(): void {
    this.loadingSearchingVideos = true;
    this.offset += this.VIDEOS_LIMIT;
    this.videoService
      .getVideosBySearch(this.searchQuery, this.offset, this.VIDEOS_LIMIT)
      .subscribe((videos: any) => {
        this.searchedVideos = [
          ...this.searchedVideos,
          ...videos.map((video: any) => ({
            ...video,
            thumbnailLink: `${environment.apiURL}/api/videos/thumbnail/${video.thumbnailFilename}`,
          })),
        ];
        this.loadingSearchingVideos = false;
      });
  }
}
