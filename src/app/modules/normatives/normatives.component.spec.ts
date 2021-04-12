import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormativesComponent } from './normatives.component';

describe('NormativesComponent', () => {
  let component: NormativesComponent;
  let fixture: ComponentFixture<NormativesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NormativesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NormativesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
