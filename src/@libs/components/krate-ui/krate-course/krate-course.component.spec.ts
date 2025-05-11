import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KrateCourseComponent } from './krate-course.component';

describe('KrateCourseComponent', () => {
  let component: KrateCourseComponent;
  let fixture: ComponentFixture<KrateCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KrateCourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KrateCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
