import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KrateProjectComponent } from './krate-project.component';

describe('KrateProjectComponent', () => {
  let component: KrateProjectComponent;
  let fixture: ComponentFixture<KrateProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KrateProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KrateProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
