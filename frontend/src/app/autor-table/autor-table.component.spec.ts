import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorTableComponent } from './autor-table.component';

describe('AutorTableComponent', () => {
  let component: AutorTableComponent;
  let fixture: ComponentFixture<AutorTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutorTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
