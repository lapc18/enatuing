import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary-card',
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.scss']
})
export class SummaryCardComponent implements OnInit {
  @Input() title: string;
  @Input() subtitle: string;
  @Input() materialIconName: string;
  @Input() content: string;

  constructor() { }

  ngOnInit(): void {
  }

}
