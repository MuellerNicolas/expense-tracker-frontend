import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErfolgeComponent } from './erfolge.component';

describe('ErfolgeComponent', () => {
  let component: ErfolgeComponent;
  let fixture: ComponentFixture<ErfolgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErfolgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErfolgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
