import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoContentComponent } from '../video-content/video-content.component';
import { map, Observable } from 'rxjs';
import { VideoService } from '../services/video/video.service';
import { AsyncPipe } from '@angular/common';
import { Video } from '../types/video';
import { CommentsComponent } from '../components/comments/comments.component';

@Component({
  selector: 'app-watch',
  standalone: true,
  imports: [VideoContentComponent, AsyncPipe, CommentsComponent],
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
    protected videoService: VideoService
  ) {
    this.route.queryParamMap.subscribe((params) => {
      this.videoId = params.get('v') || '';
      this.video.id = this.videoId;
      this.videoService.getVideo(this.videoId).then((video) => {
        this.video = video;
      });
    });
  }

  ngOnInit(): void {}
}
