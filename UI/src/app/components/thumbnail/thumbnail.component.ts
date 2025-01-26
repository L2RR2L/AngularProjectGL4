import { Component, input, Input } from '@angular/core';
import { Video } from '../../types/video';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.css'],
  standalone: true,
})
export class ThumbnailComponent {
  width = input<number>();
  video = input.required<Video>();
}
