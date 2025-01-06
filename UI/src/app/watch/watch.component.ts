import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoContentComponent } from '../video-content/video-content.component';

@Component({
  selector: 'app-watch',
  standalone: true,
  imports: [VideoContentComponent],
  templateUrl: './watch.component.html',
  styleUrl: './watch.component.css',
})
export class WatchComponent implements OnInit {
  videoId!: string | null;
  isSmallScreen: boolean = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.videoId = params.get('v');
    });
  }
}
