import { EventEmitter, Component, OnInit, Input, Output } from '@angular/core';
import { ChartItem } from '../../models/shared.models';

@Component({
  selector: 'vertical-bar-chart',
  templateUrl: './vertical-bar-chart.component.html',
  styleUrls: ['./vertical-bar-chart.component.scss']
})
export class VerticalBarChartComponent implements OnInit {
  @Input() title?: string;
  @Input() chartItems: ChartItem[];
  @Input() roundedBars?: boolean = true;
  @Input() barSpacing?: number = 40;
  @Input() showLegend?: boolean = false;
  @Input() xAxisLabel?: string;
  @Input() yAxisLabel?: string;

  @Output() onSelect: EventEmitter<any> = new EventEmitter<any>()

  showXAxisLabel = false;
  showYAxisLabel = false;
  showXAxis = true;
  showYAxis = true;
  gradient = false;
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
