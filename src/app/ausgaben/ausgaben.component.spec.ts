import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { SharedModule } from '../shared/shared.module';

import { AusgabenComponent } from './ausgaben.component';
import { AusgabenService } from './ausgaben.service';

describe('AusgabenComponent', () => {
  let component: AusgabenComponent;
  let fixture: ComponentFixture<AusgabenComponent>;

  // let ausgabenServiceStub: Partial<AusgabenService>;
  let ausgabenService: AusgabenService;
  
  beforeEach(async () => {

    const ausgabenServiceStub = {
      getAusgaben() {
        const AUSGABEN = [
          {
            "id": 1,
            "name": "Fahrradpumpe",
            "betrag": 10,
            "waehrung": "€",
            "kategorie": "Freizeit",
            "datum": new Date("December 17, 1995 03:24:00")
          },
          {
            "id": 2,
            "name": "Brot",
            "betrag": 1.5,
            "waehrung": "€",
            "kategorie": "Essen und Trinken",
            "datum": new Date("December 18, 1995 03:24:00")
          },
          {
            "id": 3,
            "name": "Wein",
            "betrag": 3.5,
            "waehrung": "€",
            "kategorie": "Essen und Trinken",
            "datum": new Date("December 19, 1995 03:24:00")
          }
        ];
        return of( AUSGABEN );
      }
    };

    await TestBed.configureTestingModule({
      imports: [ FormsModule, SharedModule, HttpClientModule, HttpClientTestingModule ],
      declarations: [ AusgabenComponent ],
      providers: [ {provide: AusgabenService, useValue: ausgabenServiceStub}]
    });
    // TestBed.overrideComponent(AusgabenComponent, {
    //   set: {
    //     providers: [{ provide: AusgabenService, 
    //       useClass: class {
    //         getAusgaben = jasmine.createSpy("getAusgaben"); 
    //       }
    //     }]
    //   }
    // }); 
  
    fixture = TestBed.createComponent(AusgabenComponent);
    component = fixture.componentInstance;
    // ausgabenService = fixture.debugElement.injector.get(AusgabenService);
    
    // ausgabenService = TestBed.inject(AusgabenService);

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
