import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KsiazkaTableComponent } from './ksiazka-table.component';

describe('KsiazkaTableComponent', () => {
  let component: KsiazkaTableComponent;
  let fixture: ComponentFixture<KsiazkaTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KsiazkaTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KsiazkaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
