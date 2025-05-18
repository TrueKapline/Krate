import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KrateSelectComponent } from './krate-select.component';

describe('KrateSelectComponent', () => {
  let component: KrateSelectComponent;
  let fixture: ComponentFixture<KrateSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KrateSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KrateSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
