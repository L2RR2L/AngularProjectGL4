import { Component, input } from '@angular/core';
import { Video } from '../../../types/video';
import { VideoSummaryCardComponent } from '../../../components/video-summary-card/video-summary-card.component';
import { VideoSummaryCardSkeletonComponent } from '../../../components/video-summary-card-skeleton/video-summary-card-skeleton.component';

@Component({
  selector: 'app-list-videos-summary',
  standalone: true,
  imports: [VideoSummaryCardComponent, VideoSummaryCardSkeletonComponent],
  templateUrl: './list-videos-summary.component.html',
  styleUrl: './list-videos-summary.component.css',
})
export class ListVideosSummaryComponent {
  videos = input.required<Video[]>();
  isLoading = input.required<boolean>();
  skeletonArray = Array.from({ length: 8 });
}
