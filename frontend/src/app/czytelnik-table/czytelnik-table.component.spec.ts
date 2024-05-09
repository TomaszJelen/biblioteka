import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CzytelnikTableComponent } from './czytelnik-table.component';

describe('CzytelnikTableComponent', () => {
  let component: CzytelnikTableComponent;
  let fixture: ComponentFixture<CzytelnikTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CzytelnikTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CzytelnikTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
