import { Component, OnInit, Input } from '@angular/core';
import { StatisticsCard } from '../../models/shared.models';

@Component({
  selector: 'statistics-card',
  templateUrl: './statistics-card.component.html',
  styleUrls: ['./statistics-card.component.scss']
})
export class StatisticsCardComponent implements OnInit, StatisticsCard {
  @Input() label: string;
  @Input() highlightedText: string;
  @Input() iconUrl: string; 

  constructor() { }

  ngOnInit(): void {
  }

}
