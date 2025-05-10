import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KrateTextareaComponent } from './krate-textarea.component';

describe('KrateTextareaComponent', () => {
  let component: KrateTextareaComponent;
  let fixture: ComponentFixture<KrateTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KrateTextareaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KrateTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
