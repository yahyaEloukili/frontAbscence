import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbscencesComponent } from './abscences.component';

describe('AbscencesComponent', () => {
  let component: AbscencesComponent;
  let fixture: ComponentFixture<AbscencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbscencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbscencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
