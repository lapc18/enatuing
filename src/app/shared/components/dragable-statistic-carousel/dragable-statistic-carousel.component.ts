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
  @Input() transitionInterval = 40000;
  interval: any;

  constructor() { }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.interval = setInterval(() => {
      this.moveRight();
    }, this.transitionInterval);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  moveLeft() {
    this.dragScroll.moveLeft();
  }

  moveRight() {
    this.dragScroll.moveRight();
  }
}


