import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisibilityFormComponent } from './visibility-form.component';

describe('VisibilityFormComponent', () => {
  let component: VisibilityFormComponent;
  let fixture: ComponentFixture<VisibilityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisibilityFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisibilityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
