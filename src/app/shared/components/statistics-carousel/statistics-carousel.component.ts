import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { StatisticsCard } from '../../models/shared.models';

@Component({
  selector: 'statistics-carousel',
  templateUrl: './statistics-carousel.component.html',
  styleUrls: ['./statistics-carousel.component.scss']
})
export class StatisticsCarouselComponent implements OnInit, OnDestroy {
  @Input() statisticList: StatisticsCard[];
  @Input() size = 5;
  @Input() transitionInterval = 3000;
  
  currentSlideIndexes = [];
  interval: any;

  constructor() { }

  ngOnInit(): void {
    const currentSlides: StatisticsCard[] = this.statisticList.slice(0, this.size);
    this.currentSlideIndexes = currentSlides.map((slide, index) => index);
    this.interval = setInterval(() => {
      this.nextClick();
    }, this.transitionInterval);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  previousClick() {
    const previous = this.currentSlideIndexes[0] - 1;
    const previousIndex = previous < 0 ? this.statisticList.length - 1 : previous;
    this.currentSlideIndexes.unshift(previousIndex);
    this.currentSlideIndexes.pop()
  }

  nextClick() {
    const next = this.currentSlideIndexes[this.currentSlideIndexes.length - 1] + 1;
    const startPosition = next === this.statisticList.length ? 0 : next;
    this.currentSlideIndexes.shift()
    this.currentSlideIndexes.push(startPosition);
  }
}
