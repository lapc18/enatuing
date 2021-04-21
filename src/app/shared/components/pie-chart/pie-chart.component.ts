import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChartItem, Chart } from './../../models/shared.models';

@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, Chart {
  @Input() chartItems: ChartItem[];
  @Input() title?: string;
  @Input() showLabels?: boolean = true;
  @Input() showLegend?: boolean = false;
  @Input() isDoughnut?: boolean = false;
  @Output() onSelect: EventEmitter<any> = new EventEmitter<any>()

  trimLabels = true;
  maxLabelLength = 40;
  colorScheme = {
    domain: []
  };

  constructor() { }

  ngOnInit(): void {
    const itemColors: string[] = this.chartItems.map(item => item.hexColor);
    this.colorScheme.domain = itemColors;
  }

}
