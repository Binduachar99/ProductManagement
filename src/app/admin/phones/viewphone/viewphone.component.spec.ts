import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewphoneComponent } from './viewphone.component';

describe('ViewphoneComponent', () => {
  let component: ViewphoneComponent;
  let fixture: ComponentFixture<ViewphoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewphoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewphoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
