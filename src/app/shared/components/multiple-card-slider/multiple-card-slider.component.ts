import { Component, OnInit, Input, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { SliderCard } from '../../models/shared.models';

@Component({
  selector: 'multiple-card-slider',
  templateUrl: './multiple-card-slider.component.html',
  styleUrls: ['./multiple-card-slider.component.scss']
})
export class MultipleCardSliderComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() sliderCardList: SliderCard[];
  @ViewChild('scrollArea') scrollArea: any; 
  @Input() transitionInterval: number = 3000;
  interval: any;

  constructor() { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
      this.interval = setInterval(() => {
          this.nextSlide()
      }, this.transitionInterval);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  previousSlide(): void {
    this.scrollArea.nativeElement.scrollLeft -= 300;
  }

  nextSlide(): void {
    this.scrollArea.nativeElement.scrollLeft += 300;
  }

}
