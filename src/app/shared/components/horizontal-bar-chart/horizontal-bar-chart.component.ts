import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChartItem, Chart, BarChart } from './../../models/shared.models';

@Component({
  selector: 'horizontal-bar-chart',
  templateUrl: './horizontal-bar-chart.component.html',
  styleUrls: ['./horizontal-bar-chart.component.scss']
})
export class HorizontalBarChartComponent implements OnInit, Chart, BarChart {
  @Input() title?: string;
  @Input() chartItems: ChartItem[];
  @Input() barSpacing?: number = 15;
  @Input() showLegend?: boolean = false;
  @Input() xAxisLabel?: string;
  @Input() yAxisLabel?: string;
  
  @Output() onSelect: EventEmitter<any> = new EventEmitter<any>()

  maxXAxisTickLength = 40;
  maxYAxisTickLength = 40;
  showXAxisLabel = false;
  showYAxisLabel = false;
  showXAxis = true;
  showYAxis = true;
  colorScheme = {
    domain: []
  };

  constructor() { }

  ngOnInit(): void {
    const itemColors: string[] = this.chartItems.map(item => item.hexColor);
    this.colorScheme.domain = itemColors;
    this.showXAxisLabel = Boolean(this.xAxisLabel);
    this.showYAxisLabel = Boolean(this.yAxisLabel);
  }

}