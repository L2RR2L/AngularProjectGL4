import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { Video } from '../../../types/video';
import { VideoService } from '../../../services/video/video.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { debounceTime, filter, fromEvent, map, mergeMap, tap } from 'rxjs';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { ClickOutsideDirective } from '../../../directives/click-outside/click-outside.directive';
import { Writable } from 'node:stream';
import { ClickVideosNavigateDirective } from '../../../directives/clickNavigate/click-videos-navigate.directive';
import { NgClass } from '@angular/common';
import { DataVideoIdDirective } from '../../../directives/clickNavigate/data-video-id.directive';

@Component({
  selector: 'app-middle-nav',
  standalone: true,
  imports: [
    SpinnerComponent,
    ClickOutsideDirective,
    NgClass,
    ClickVideosNavigateDirective,
    DataVideoIdDirective,
  ],
  templateUrl: './middle-nav.component.html',
  styleUrl: './middle-nav.component.css',
})
export class MiddleNavComponent {
  @ViewChild('seeMoreButton') seeMoreButton!: ElementRef<HTMLButtonElement>;

  searchValue: WritableSignal<string> = signal('');
  searchValue$ = toObservable(this.searchValue);
  canOpenDialog: WritableSignal<boolean> = signal(true);

  searchedVideos: any[] = [];
  loadingSearchingVideos = false;

  offset = 0;
  VIDEOS_LIMIT = 5;
  constructor(private videoService: VideoService, private router: Router) {
    this.searchValue$
      .pipe(
        tap(() => {
          this.searchedVideos = [];
          this.canOpenDialog.set(true);
        }),
        filter((value) => value.length > 3),
        tap(() => {
          this.offset = 0;
          this.loadingSearchingVideos = true;
        }),
        debounceTime(500),
        map((value) => value.trim()),
        mergeMap((value) =>
          this.videoService.getVideosBySearch(value, 0, this.VIDEOS_LIMIT)
        )
      )
      .subscribe((videos) => {
        this.searchedVideos = videos.map((video: any) => ({
          ...video,
          thumbnailFilename: `${environment.apiURL}/api/videos/thumbnail/${video.thumbnailFilename}`,
        }));
        this.loadingSearchingVideos = false;
      });
  }

  handleSeeMore(e: MouseEvent): void {
    e.stopPropagation();
    console.log('here');
    this.loadingSearchingVideos = true;
    this.offset += this.VIDEOS_LIMIT;
    this.videoService
      .getVideosBySearch(this.searchValue(), this.offset, this.VIDEOS_LIMIT)
      .subscribe((videos) => {
        this.searchedVideos = [
          ...this.searchedVideos,
          ...videos.map((video: any) => ({
            ...video,
            thumbnailFilename: `${environment.apiURL}/api/videos/thumbnail/${video.thumbnailFilename}`,
          })),
        ];
        this.loadingSearchingVideos = false;
      });
  }

  handleSearch(): void {
    if (this.searchValue().trim()) {
      this.router.navigate(['/videos/search', this.searchValue()]);
    }
  }

  handleSearchChange(value: string): void {
    this.searchValue.set(value);
  }

  handleClickOutside(): void {
    this.canOpenDialog.set(false);
  }
  handleOnFocus(): void {
    this.canOpenDialog.set(true);
  }
}
