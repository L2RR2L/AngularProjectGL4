import { Component, input, WritableSignal } from '@angular/core';
import { VideoService } from '../services/video/video.service';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-video-content',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './video-content.component.html',
  styleUrl: './video-content.component.css',
})
export class VideoContentComponent {
  videoId = input<string>('');
  videoStream$ = new Observable();
  video: any = {};
  numberOfSubscribers: number = 0;
  showMore: boolean = false;

  constructor(protected videoService: VideoService) {}

  ngOnInit(): void {
    this.fetchVideoContent();
  }

  async fetchVideoContent() {
    this.videoStream$ = this.videoService.getVideo(this.videoId()).pipe(
      map((response: any) => {
        console.log(response);

        return response.video.videoLink;
      })
    );
  }

  toggleShowMore() {
    this.showMore = !this.showMore;
  }
}
