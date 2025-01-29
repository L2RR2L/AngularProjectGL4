import {
  Component,
  effect,
  OnInit,
  signal,
  Signal,
  untracked,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoContentComponent } from '../video-content/video-content.component';
import { map, Observable, tap } from 'rxjs';
import { VideoService } from '../services/video/video.service';
import { Video } from '../types/video';
import { CommentsComponent } from '../components/comments/comments.component';
import { VideosComponent } from '../pages/trending-page/videos/videos.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { HistoryService } from '../services/side-nav-options/history/history.service';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { selectIsAuthenticatedAndLoaded } from '../store/auth/auth.selectors';

@Component({
  selector: 'app-watch',
  standalone: true,
  imports: [
    VideoContentComponent,
    AsyncPipe,
    CommentsComponent,
    VideosComponent,
  ],
  templateUrl: './watch.component.html',
  styleUrl: './watch.component.css',
  providers: [VideoService],
})
export class WatchComponent {
  videoId!: string;
  video = signal<Video>({
    id: '',
    title: '',
    views: 0,
    createdAt: '',
    description: '',
    duration: '',
    thumbnailLink: '',
    videoLink: '',
    channelId: '',
    channelName: '',
    channelImg: '',
  });
  videos = signal<Video[]>([]);
  isSmallScreen: boolean = false;

  constructor(
    private route: ActivatedRoute,
    protected videoService: VideoService,
    protected historyService: HistoryService,
    private store: Store<AppState>
  ) {

    this.route.queryParamMap.subscribe((params) => {
      this.videoId = params.get('v') || '';
      this.video().id = this.videoId;
      this.videoService.getVideo(this.videoId).then((video) => {
        this.video.set(video);
        this.store.select(selectIsAuthenticatedAndLoaded).subscribe((isAuthenticatedAndLoaded) => {
          if (isAuthenticatedAndLoaded) {
            this.historyService.saveVideoToHistory(this.videoId); // Save video to history
          }
        });
      });
    });

    this.videoService.getRecommendedVideos().subscribe((videos) => {
      this.videos.set(videos);
    });
  }

  ngOnInit(): void { }
}
