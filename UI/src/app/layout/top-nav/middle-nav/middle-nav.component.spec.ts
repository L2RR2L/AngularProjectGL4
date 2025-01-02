import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddleNavComponent } from './middle-nav.component';

describe('MiddleNavComponent', () => {
  let component: MiddleNavComponent;
  let fixture: ComponentFixture<MiddleNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiddleNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiddleNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
