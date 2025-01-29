import { Component, input } from '@angular/core';
import { Video } from '../../types/video';
import { RouterModule } from '@angular/router';
import { ThumbnailComponent } from '../thumbnail/thumbnail.component';
import { DataVideoIdDirective } from '../../directives/clickNavigate/data-video-id.directive';
import { DateFormatterPipe } from '../../pipe/date-formatter.pipe';

@Component({
  selector: 'app-video-summary-card',
  standalone: true,
  imports: [RouterModule, ThumbnailComponent, DataVideoIdDirective, DateFormatterPipe],
  templateUrl: './video-summary-card.component.html',
  styleUrl: './video-summary-card.component.css',
})
export class VideoSummaryCardComponent {
  video = input.required<Video>();
}
