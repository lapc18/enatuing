import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { DragScrollComponent } from 'ngx-drag-scroll';
import { StatisticsCard } from '../../models/shared.models';

@Component({
  selector: 'dragable-statistic-carousel',
  templateUrl: './dragable-statistic-carousel.component.html',
  styleUrls: ['./dragable-statistic-carousel.component.scss']
})
export class DragableStatisticCarouselComponent implements OnInit {
  @ViewChild('dragScroll', { read: DragScrollComponent }) dragScroll: DragScrollComponent;
  @Input() cardContentList: StatisticsCard[];
  @Input() transitionInterval: number = 40000;
  interval: any;

  constructor() { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.interval = setInterval(() => {
      this.moveRight();
    }, this.transitionInterval);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  moveLeft(): void {
    this.dragScroll.moveLeft();
  }

  moveRight(): void {
    this.dragScroll.moveRight();
  }
}

