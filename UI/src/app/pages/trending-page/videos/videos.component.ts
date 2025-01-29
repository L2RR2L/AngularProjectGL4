import { Component, input, Input } from '@angular/core';
import { Video } from '../../../types/video';
import { ThumbnailComponent } from '../../../components/thumbnail/thumbnail.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-videos',
  imports: [ThumbnailComponent, NgClass],
  templateUrl: './videos.component.html',
  standalone: true,
})
export class VideosComponent {
  under = input<boolean>(false);
  videos = input.required<Video[]>();
}
