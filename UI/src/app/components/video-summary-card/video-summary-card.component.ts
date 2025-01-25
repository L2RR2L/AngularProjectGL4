import { Component, input } from '@angular/core';
import { Video } from '../../types/video';
import { RouterModule } from '@angular/router';
import { ThumbnailComponent } from '../thumbnail/thumbnail.component';

@Component({
  selector: 'app-video-summary-card',
  standalone: true,
  imports: [RouterModule, ThumbnailComponent],
  templateUrl: './video-summary-card.component.html',
  styleUrl: './video-summary-card.component.css',
})
export class VideoSummaryCardComponent {
  video = input.required<Video>();
}
