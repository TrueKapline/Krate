import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KrateButtonComponent } from './krate-button.component';

describe('KrateButtonComponent', () => {
  let component: KrateButtonComponent;
  let fixture: ComponentFixture<KrateButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KrateButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KrateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
