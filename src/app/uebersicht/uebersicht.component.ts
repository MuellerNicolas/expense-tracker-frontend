import { Component, OnInit } from '@angular/core';
import { pieChartDataMock } from './pie-chart-data-mock';
import { lineChartDataMock } from './line-chart-data-mock';
import { gaugeChartDataMock } from './gauge-chart-data-mock';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'uebersicht',
  templateUrl: './uebersicht.component.html',
  styleUrls: ['./uebersicht.component.scss']
})
export class UebersichtComponent implements OnInit {
  
  // Von der Bildschirmgröße abhängige Größen der Charts 
  pieChartViewSizes = {
    XSmall: [375, 275],
    Small: [500, 400],
    Medium: [700, 600],
    Large: [700, 600],
    XLarge: [700, 600]
  }
  lineChartViewSizes = {
    XSmall: [375, 275],
    Small: [700, 400],
    Medium: [900, 400],
    Large: [1100, 600],
    XLarge: [1100, 600]
  }
  gaugeChartViewSizes = {
    XSmall: [375, 275],
    Small: [500, 400],
    Medium: [700, 600],
    Large: [700, 600],
    XLarge: [700, 600]
  }
  // Alle Charts Konfiguration
  legendTitle: string = "Legende"
  
  // Piechart Konfiguration
  pieChartView: any = [700, 600];
  pieChartData: any [] = pieChartDataMock;
  pieChartGradient: boolean = true;
  pieChartShowLegend: boolean = true;
  pieChartLegendPosition: any = 'right';
  pieChartLegendTitle: string = "Legende";
  pieChartShowLabels: boolean = true;
  
  // Linechart Konfiguration
  lineChartView: any = [700, 600];
  lineChartData: any[] = lineChartDataMock;
  lineChartlegend: boolean = true;
  lineChartLegendPosition: any = 'right';
  showLabels: boolean = true;
  animations: boolean = true;
  lineChartXAxis: boolean = true;
  lineChartYAxis: boolean = true;
  lineChartshowXAxisLabel: boolean = true;
  lineChartshowYAxisLabel: boolean = true;
  lineChartXAxisLabel: string = 'Datum';
  lineChartYAxisLabel: string = 'Euro';
  lineChartTimeline: boolean = true;
  
  // Gaugechart Konfiguration
  gaugeChartView: any = [700, 600];
  gaugeChartData: any[] = gaugeChartDataMock;
  gaugeChartLegend: boolean = true;
  gaugeChartLegendPosition: any = 'right';

  constructor(private bpObserver: BreakpointObserver) {
    // Responsive Design der Charts
    this.bpObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).subscribe(bp => {
      switch(bp.matches) {
        case bp.breakpoints[Breakpoints.XSmall]: {
          this.pieChartView = this.pieChartViewSizes.XSmall;
          this.lineChartView = this.lineChartViewSizes.XSmall;
          this.gaugeChartView = this.gaugeChartViewSizes.XSmall;
          break;
        }
        case bp.breakpoints[Breakpoints.Small]: {
          this.pieChartView = this.pieChartViewSizes.Small;
          this.lineChartView = this.lineChartViewSizes.Small;
          this.gaugeChartView = this.gaugeChartViewSizes.Small;
          break;
        }
        case bp.breakpoints[Breakpoints.Medium]: {
          this.pieChartView = this.pieChartViewSizes.Medium;
          this.lineChartView = this.lineChartViewSizes.Medium;
          this.gaugeChartView = this.gaugeChartViewSizes.Medium;
          break;
        }
        case bp.breakpoints[Breakpoints.Large]: {
          this.pieChartView = this.pieChartViewSizes.Large;
          this.lineChartView = this.lineChartViewSizes.Large;
          this.gaugeChartView = this.gaugeChartViewSizes.Large;
          break;
        }
        case bp.breakpoints[Breakpoints.XLarge]: {
          this.pieChartView = this.pieChartViewSizes.XLarge;
          this.lineChartView = this.lineChartViewSizes.XLarge;
          this.gaugeChartView = this.gaugeChartViewSizes.XLarge;
          break;
        }
      }
    });
  }

  ngOnInit(): void {
  }

}
