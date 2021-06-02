import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ErfolgeService } from './erfolge.service';
import { Badge } from './badge.model';

@Component({
  selector: 'erfolge',
  templateUrl: './erfolge.component.html',
  styleUrls: ['./erfolge.component.scss'],
})
export class ErfolgeComponent implements OnInit {
  breakpoint: number;
  budgetStreak: number = 0;
  badges: Badge[] = [];

  // TODO Später löschen
  value = 50;

  bpCols = {
    XSmall: 1,
    Small: 2,
    Medium: 3,
    Large: 3,
    XLarge: 4,
  };

  constructor(
    private erfolgeService: ErfolgeService,
    private bpObserver: BreakpointObserver
  ) {
    this.breakpoint = 3;
    this.bpObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((bp) => {
        switch (bp.matches) {
          case bp.breakpoints[Breakpoints.XSmall]: {
            this.breakpoint = this.bpCols.XSmall;
            break;
          }
          case bp.breakpoints[Breakpoints.Small]: {
            this.breakpoint = this.bpCols.Small;
            break;
          }
          case bp.breakpoints[Breakpoints.Medium]: {
            this.breakpoint = this.bpCols.Medium;
            break;
          }
          case bp.breakpoints[Breakpoints.Large]: {
            this.breakpoint = this.bpCols.Large;
            break;
          }
          case bp.breakpoints[Breakpoints.XLarge]: {
            this.breakpoint = this.bpCols.XLarge;
            break;
          }
        }
      });
  }

  ngOnInit() {
    // Budget Streak
    this.getBudgetStreak();
    // Badge Informationen
    this.getBadges();
  }

  getBudgetStreak(): void {
    this.erfolgeService.getBudgetStreak().subscribe((budgetStreak) => {
      this.budgetStreak = budgetStreak.monateBudgetStreak;
    });
  }

  getBadges(): void {
    this.erfolgeService.getBadges().subscribe((badges) => {
      // dynamische Felder füllen durch erzeugen von Badge-Objekten
      this.badges = badges.map((badge: Badge) => {
        return new Badge(
          badge.id,
          badge.kategorieName,
          badge.monateEingehaltenTotal
        );
      });
      // Nach Alphabet ordnen
      this.badges.sort((a: Badge, b: Badge) =>
        a.kategorieName!.localeCompare(b.kategorieName!)
      );
    });
  }
}
