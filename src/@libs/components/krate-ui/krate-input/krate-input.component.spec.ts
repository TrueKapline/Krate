import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KrateInputComponent } from './krate-input.component';

describe('KrateInputComponent', () => {
  let component: KrateInputComponent;
  let fixture: ComponentFixture<KrateInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KrateInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KrateInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
