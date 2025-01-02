import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoDropzoneComponent } from './video-dropzone.component';

describe('VideoDropzoneComponent', () => {
  let component: VideoDropzoneComponent;
  let fixture: ComponentFixture<VideoDropzoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoDropzoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoDropzoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
