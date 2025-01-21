import { Component, input, Input } from '@angular/core';
import { Video } from '../../../types/video';
import { ThumbnailComponent } from '../../../components/thumbnail/thumbnail.component';

@Component({
  selector: 'app-videos',
  imports: [ThumbnailComponent],
  templateUrl: './videos.component.html',
  standalone: true,
})
export class VideosComponent {
  videos = input.required<Video[]>();
}
