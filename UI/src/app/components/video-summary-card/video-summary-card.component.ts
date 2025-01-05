import { Component, input } from '@angular/core';
import { Video } from '../../types/video';

@Component({
  selector: 'app-video-summary-card',
  standalone: true,
  imports: [],
  templateUrl: './video-summary-card.component.html',
  styleUrl: './video-summary-card.component.css',
})
export class VideoSummaryCardComponent {
  video = input.required<Video>();
}
