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
