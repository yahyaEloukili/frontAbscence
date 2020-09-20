import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SceancesComponent } from './sceances.component';

describe('SceancesComponent', () => {
  let component: SceancesComponent;
  let fixture: ComponentFixture<SceancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SceancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
