import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { SharedModule } from '../shared/shared.module';
import { AUSGABEN } from './ausgaben-mock';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { PunktZuKommaPipe } from '../shared/punkt-zu-komma.pipe';

import { AusgabenComponent } from './ausgaben.component';
import { AusgabenService } from './ausgaben.service';

let loader: HarnessLoader;

describe('AusgabenComponent', () => {
  let component: AusgabenComponent;
  let fixture: ComponentFixture<AusgabenComponent>;

  beforeEach(async () => {
    const ausgabenServiceStub = {
      getAusgaben() {
        return of(AUSGABEN);
      },
    };

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        SharedModule,
        HttpClientModule,
        HttpClientTestingModule,
      ],
      declarations: [AusgabenComponent],
      providers: [{ provide: AusgabenService, useValue: ausgabenServiceStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(AusgabenComponent);
    component = fixture.componentInstance;
    // Angular Material Test Helper
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AusgabenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return error message "Pflichtfeld"', () => {
    // FormField-Mock
    const formField = {
      hasError(input: string): boolean {
        if (input === 'required') return true;
        if (input === 'min') return false;
        else return false;
      },
    };
    expect(component.getErrorMessage(formField)).toBe('Pflichtfeld');
  });

  it('should return error message "Der Wert darf nicht negativ sein"', () => {
    // FormField-Mock
    const formField = {
      control: {
        errors: {
          min: {
            actual: -1,
            min: 0,
          },
        },
      },
      hasError(input: string): boolean {
        if (input === 'required') return false;
        if (input === 'min') return true;
        else return false;
      },
    };
    expect(component.getErrorMessage(formField)).toBe(
      'Der Wert darf nicht negativ sein'
    );
  });

  it('should return an empty error message', () => {
    // FormField-Mock
    const formField = {
      hasError(input: string): boolean {
        if (input === 'required') return false;
        if (input === 'min') return false;
        else return false;
      },
    };
    expect(component.getErrorMessage(formField)).toBe('');
  });

  it('should have Header "Ihre Ausgaben"', () => {
    const headerDe: DebugElement = fixture.debugElement;
    const headerEl: HTMLElement = headerDe.nativeElement;
    const h1 = headerEl.querySelector('h1')!;
    expect(h1.textContent).toEqual('Ihre Ausgaben:');
  });

  it('should disable "Hinzufügen"-Button without inputs', async () => {
    const button = await loader.getHarness(
      MatButtonHarness.with({ selector: '#buttonNeueAusgabeHinzufuegen' })
    );
    expect(await button.isDisabled()).toBe(true);
  });

  it('should display Ausgaben Header', () => {
    component.ngOnInit();
    const allExpansionPanels = document.querySelectorAll('mat-expansion-panel');
    // convert obj to array
    const expansionPanels = Array.from(allExpansionPanels);
    expansionPanels.forEach((expansionPanel) => {
      component.ausgaben.forEach((ausgabe) => {
        if (expansionPanel.classList.contains(ausgabe.expenseId!)) {
          // Get expected formatted Date
          let day: any = ausgabe.datum!.getDate();
          let month: any = ausgabe.datum!.getMonth() + 1;
          if (String(day).length == 1) day = '0' + day;
          if (String(month).length == 1) month = '0' + month;
          const expectedDate =
            day + '.' + month + '.' + ausgabe.datum!.getFullYear();
          // Construct expectedHeaderText
          const expectedHeaderText =
            expectedDate +
            ' ' +
            ausgabe.name +
            ' ' +
            new PunktZuKommaPipe().transform(ausgabe.betrag) +
            ' € ' +
            ausgabe.kategorie;
          // get html-node
          const node: any = expansionPanel.childNodes[0];
          expect(node.innerText).toBe(expectedHeaderText);
        }
      });
    });
  });

  it('should update field', async () => {
    const inputField = await loader.getHarness<MatInputHarness>(
      MatInputHarness.with({
        value: 'Fahrradpumpe',
      })
    );
    fixture.detectChanges();
    inputField.setValue('Luftpumpe').then(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.ausgaben[2].name).toBe('Luftpumpe');
      });
    });
  });

  it('should delete ausgabe', async () => {
    fixture.detectChanges();
    fixture.whenStable().then(async () => {
      const parentComponent = await loader.getChildLoader(
        '.60bc9d0817bb78102e5a0ceb'
      );
      const deleteButton = await parentComponent.getHarness(
        MatButtonHarness.with({
          selector: '.delete',
        })
      );
      expect(await deleteButton.isDisabled()).toBe(false);
      await deleteButton.click();
      const containsAusgabe = component.ausgaben
        .map((ausgabe) => {
          return ausgabe.expenseId === '60bc9d0817bb78102e5a0ceb'
            ? true
            : false;
        })
        .some((bool) => bool === true);
      expect(containsAusgabe).toBeFalse();
    });
  });
});
