import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffecterAbscenceComponent } from './affecter-abscence.component';

describe('AffecterAbscenceComponent', () => {
  let component: AffecterAbscenceComponent;
  let fixture: ComponentFixture<AffecterAbscenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffecterAbscenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffecterAbscenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
