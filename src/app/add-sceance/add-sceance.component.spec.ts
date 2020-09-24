import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSceanceComponent } from './add-sceance.component';

describe('AddSceanceComponent', () => {
  let component: AddSceanceComponent;
  let fixture: ComponentFixture<AddSceanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSceanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSceanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
