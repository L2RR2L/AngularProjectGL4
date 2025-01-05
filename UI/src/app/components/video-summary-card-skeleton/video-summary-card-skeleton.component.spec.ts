import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoSummaryCardSkeletonComponent } from './video-summary-card-skeleton.component';

describe('VideoSummaryCardSkeletonComponent', () => {
  let component: VideoSummaryCardSkeletonComponent;
  let fixture: ComponentFixture<VideoSummaryCardSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoSummaryCardSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoSummaryCardSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
