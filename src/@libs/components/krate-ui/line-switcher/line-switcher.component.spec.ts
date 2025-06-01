import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineSwitcherComponent } from './line-switcher.component';

describe('LineSwitcherComponent', () => {
  let component: LineSwitcherComponent;
  let fixture: ComponentFixture<LineSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineSwitcherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
