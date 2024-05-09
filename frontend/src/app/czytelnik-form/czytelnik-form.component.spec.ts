import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CzytelnikFormComponent } from './czytelnik-form.component';

describe('CzytelnikFormComponent', () => {
  let component: CzytelnikFormComponent;
  let fixture: ComponentFixture<CzytelnikFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CzytelnikFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CzytelnikFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
