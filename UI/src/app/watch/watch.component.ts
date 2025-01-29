import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoContentComponent } from '../video-content/video-content.component';
import { VideoService } from '../services/video/video.service';
import { Video } from '../types/video';
import { CommentsComponent } from '../components/comments/comments.component';
import { HistoryService } from '../services/side-nav-options/history/history.service';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { selectIsAuthenticatedAndLoaded } from '../store/auth/auth.selectors';

@Component({
  selector: 'app-watch',
  standalone: true,
  imports: [VideoContentComponent, CommentsComponent],
  templateUrl: './watch.component.html',
  styleUrl: './watch.component.css',
  providers: [VideoService],
})
export class WatchComponent implements OnInit {
  videoId!: string;
  video: Video = {
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
  };

  isSmallScreen: boolean = false;

  constructor(
    private route: ActivatedRoute,
    protected videoService: VideoService,
    protected historyService: HistoryService,
    private store: Store<AppState>
  ) {

    this.route.queryParamMap.subscribe((params) => {
      this.videoId = params.get('v') || '';
      this.video.id = this.videoId;
      this.videoService.getVideo(this.videoId).then((video) => {
        this.video = video;
        this.store.select(selectIsAuthenticatedAndLoaded).subscribe((isAuthenticatedAndLoaded) => {
          if (isAuthenticatedAndLoaded) {
            this.historyService.saveVideoToHistory(this.videoId); // Save video to history
          }
        });
      });
    });
  }

  ngOnInit(): void { }
}
