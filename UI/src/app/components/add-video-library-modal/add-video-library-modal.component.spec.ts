import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVideoLibraryModalComponent } from './add-video-library-modal.component';

describe('AddVideoLibraryModalComponent', () => {
  let component: AddVideoLibraryModalComponent;
  let fixture: ComponentFixture<AddVideoLibraryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddVideoLibraryModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVideoLibraryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
