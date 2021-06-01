import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { SharedModule } from '../shared/shared.module';
import { AUSGABEN } from './ausgaben-mock';

import { AusgabenComponent } from './ausgaben.component';
import { AusgabenService } from './ausgaben.service';

describe('AusgabenComponent', () => {
  let component: AusgabenComponent;
  let fixture: ComponentFixture<AusgabenComponent>;

  beforeEach(async () => {
    const ausgabenServiceStub = {
      getAusgaben() {
        return of(AUSGABEN);
      }
    };

    await TestBed.configureTestingModule({
      imports: [ FormsModule, SharedModule, HttpClientModule, HttpClientTestingModule ],
      declarations: [ AusgabenComponent ],
      providers: [ {provide: AusgabenService, useValue: ausgabenServiceStub}]
    })
    .compileComponents();
  
    fixture = TestBed.createComponent(AusgabenComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AusgabenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
