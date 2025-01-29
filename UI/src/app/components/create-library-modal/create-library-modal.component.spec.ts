import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLibraryModalComponent } from './create-library-modal.component';

describe('CreateLibraryModalComponent', () => {
  let component: CreateLibraryModalComponent;
  let fixture: ComponentFixture<CreateLibraryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateLibraryModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLibraryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
