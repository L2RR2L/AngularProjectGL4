import { Component, input, OnInit } from '@angular/core';
import { VideoSummaryCardComponent } from '../../../components/video-summary-card/video-summary-card.component';
import { VideoSummaryCardSkeletonComponent } from '../../../components/video-summary-card-skeleton/video-summary-card-skeleton.component';
import { History } from '../../../types/history';
import { DateFormatterPipe } from '../../../pipe/date-formatter.pipe';

@Component({
  selector: 'app-list-videos-summary',
  standalone: true,
  imports: [VideoSummaryCardComponent, VideoSummaryCardSkeletonComponent, DateFormatterPipe],
  templateUrl: './list-videos-summary.component.html',
  styleUrl: './list-videos-summary.component.css',
})
export class ListVideosSummaryComponent implements OnInit {
  histories = input.required<History[]>();
  isLoading = input.required<boolean>();
  a = input.required<string>();
  skeletonArray = Array.from({ length: 8 });

  ngOnInit() {
    console.log("this.histories", this.histories());

  }
}
