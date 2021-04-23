import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { SliderCard } from '../../models/shared.models';

@Component({
  selector: 'multiple-card-slider',
  templateUrl: './multiple-card-slider.component.html',
  styleUrls: ['./multiple-card-slider.component.scss']
})
export class MultipleCardSliderComponent implements OnInit, OnDestroy {

  @Input() sliderCardList: SliderCard[];
  @ViewChild('scrollArea') scrollArea: any; 
  @Input() transitionInterval = 3000;
  interval: any;

  constructor() { }

  ngOnInit() {}

  ngAfterViewInit() {
      this.interval = setInterval(() => {
          this.nextSlide()
      }, this.transitionInterval);
  }

  ngOnDestroy() {
    this.interval.clear();
  }

  previousSlide() {
    this.scrollArea.nativeElement.scrollLeft -= 300;
  }

  nextSlide() {
    this.scrollArea.nativeElement.scrollLeft += 300;
  }

}
