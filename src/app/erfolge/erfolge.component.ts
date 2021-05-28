import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'erfolge',
  templateUrl: './erfolge.component.html',
  styleUrls: ['./erfolge.component.scss']
})
export class ErfolgeComponent implements OnInit {
  breakpoint: number;

  
  value = 50;

  bpCols = {
    XSmall: 1,
    Small: 1,
    Medium: 3,
    Large: 3,
    XLarge: 4
  }

  constructor(private bpObserver: BreakpointObserver) {
    this.breakpoint = 3;
    this.bpObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).subscribe(bp => {
      switch(bp.matches) {
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
  }

  onResize(event: any) {
  }
}
