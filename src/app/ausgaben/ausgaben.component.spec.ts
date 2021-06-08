import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { SharedModule } from '../shared/shared.module';
import { AUSGABEN } from './ausgaben-mock';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
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
          let month: any = ausgabe.datum!.getMonth();
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
      const ausgabeLoader = await loader.getChildLoader(
        '.60bc9d0817bb78102e5a0ceb'
      );
      const deleteButton = await ausgabeLoader.getHarness(
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

  // it('should display Ausgaben Details in FormElements', () => {
  //   component.ngOnInit();
  //   const allExpansionPanels = document.querySelectorAll('mat-expansion-panel');
  //   // convert obj to array
  //   const expansionPanels = Array.from(allExpansionPanels);
  //   console.log(expansionPanels);
  //   expansionPanels.forEach((expansionPanel) => {
  //     component.ausgaben.forEach((ausgabe) => {
  //       if (expansionPanel.classList.contains(ausgabe.expenseId!)) {
  //         const node: any = expansionPanel.childNodes[1].childNodes[0];

  //         console.warn(node);

  //         const datum: any = node.attributes[7].textContent;
  //         console.warn(datum);
  //         // expect(datum.value).toBe(ausgabe.datum?.toString());
  //         // // Construct expectedHeaderText
  //         // const expectedHeaderText =
  //         //   expectedDate +
  //         //   ' ' +
  //         //   ausgabe.name +
  //         //   ' ' +
  //         //   new PunktZuKommaPipe().transform(ausgabe.betrag) +
  //         //   ' € ' +
  //         //   ausgabe.kategorie;
  //         // const name: any = expansionPanel.childNodes[1].childNodes[1];
  //         // const betrag: any = expansionPanel.childNodes[1].childNodes[3];
  //       }
  //     });
  //   });
  // });

  // it('should enable "Hinzufügen"-Button with inputs', fakeAsync(() => {
  //   // component.neueAusgabe.datum = new Date('December 17, 1995 03:24:00');
  //   // component.neueAusgabe.name = 'Neue Ausgabe';
  //   component.neueAusgabe.betrag = 1337;
  //   // component.neueAusgabe.kategorie = 'Freizeit';
  //   console.log(component.neueAusgabe);
  //   fixture.detectChanges();
  //   const hostElement = fixture.nativeElement;
  //   const nameInput = hostElement.querySelector(
  //     '#neue-ausgabe-input-datum'
  //   ).value;
  //   const ausgabeInput = hostElement.querySelector(
  //     '#neue-ausgabe-input-name'
  //   ).value;
  //   const betragInput = hostElement.querySelector(
  //     '#neue-ausgabe-input-betrag'
  //   ).value;
  //   console.log(betragInput);

  //   tick();
  //   fixture.detectChanges();

  //   fixture.whenStable().then(() => {
  //     expect(component.neueAusgabe.betrag).toBe(betragInput.toString());
  //   });
  // }));

  // it('should disable "Hinzufügen"-Button with inputs', async () => {
  //   const debugElement = fixture.debugElement;
  //   let nameInput = fixture.debugElement.query(
  //     By.css('#neue-ausgabe-input-datum')
  //   );
  //   let ausgabeInput = debugElement.query(By.css('#neue-ausgabe-input-name'));
  //   let betragInput = debugElement.query(By.css('#neue-ausgabe-input-betrag'));
  //   fixture.detectChanges();

  //   nameInput.nativeElement.value = '01.01.2020';
  //   ausgabeInput.nativeElement.value = 'Neue Ausgabe';
  //   betragInput.nativeElement.value = 1337;

  //   nameInput.nativeElement.dispatchEvent(new Event('input'));
  //   ausgabeInput.nativeElement.dispatchEvent(new Event('input'));
  //   betragInput.nativeElement.dispatchEvent(new Event('input'));

  //   fixture.whenStable().then(() => {
  //     expect(component.neueAusgabe.datum).toEqual(new Date('01.01.2020'));
  //     expect(component.neueAusgabe.name).toBe('Neue Ausgabe');
  //     expect(component.neueAusgabe.betrag).toBe(1337);
  //   });
  // const select = await loader.getHarness(
  //   MatSelectHarness.with({ selector: '#neue-ausgabe-input-kategorie' })
  // );
  // const select = await loader.getHarness<MatSelectHarness>(MatSelectHarness);
  // await select.open();
  // const options = await select.getOptions();

  // expect(options.length).toEqual(9);

  // await options[2].click();

  // expect(await select.getValueText()).toBe('Tacos');

  // const selectOption = { value: 'Mobilität' };
  // fixture.debugElement
  //   .query(By.css('#neue-ausgabe-input-kategorie'))
  //   .triggerEventHandler('selectionChange', selectOption);

  // fixture.detectChanges();

  // const button = await loader.getHarness(
  //   MatButtonHarness.with({ selector: '#buttonNeueAusgabeHinzufuegen' })
  // );
  // fixture.detectChanges();
  // expect(await button.isDisabled()).toBe(false);
  // });
});
