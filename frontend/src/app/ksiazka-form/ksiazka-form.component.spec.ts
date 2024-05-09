import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KsiazkaFormComponent } from './ksiazka-form.component';

describe('KsiazkaFormComponent', () => {
  let component: KsiazkaFormComponent;
  let fixture: ComponentFixture<KsiazkaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KsiazkaFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KsiazkaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
