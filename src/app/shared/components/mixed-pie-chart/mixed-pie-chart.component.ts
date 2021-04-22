import { Component, OnInit, Input } from '@angular/core';
import { ChartItem } from '../../models/shared.models';

@Component({
  selector: 'mixed-pie-chart',
  templateUrl: './mixed-pie-chart.component.html',
  styleUrls: ['./mixed-pie-chart.component.scss']
})
export class MixedPieChartComponent implements OnInit {
  @Input() title: string;
  @Input() dataSource: ChartItem[];

  constructor() { }

  ngOnInit(): void {
  }

}
