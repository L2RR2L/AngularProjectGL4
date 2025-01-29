import { Component, input, Input } from '@angular/core';
import { Video } from '../../../types/video';
import { ThumbnailComponent } from '../../../components/thumbnail/thumbnail.component';
import { NgClass } from '@angular/common';
import { ClickVideosNavigateDirective } from '../../../directives/clickNavigate/click-videos-navigate.directive';
import { DataVideoIdDirective } from '../../../directives/clickNavigate/data-video-id.directive';
import { DateFormatterPipe } from '../../../pipe/date-formatter.pipe';

@Component({
  selector: 'app-videos',
  imports: [
    ThumbnailComponent,
    NgClass,
    ClickVideosNavigateDirective,
    DataVideoIdDirective,
    DateFormatterPipe
  ],
  templateUrl: './videos.component.html',
  standalone: true,
})
export class VideosComponent {
  under = input<boolean>(false);
  videos = input.required<Video[]>();
}
