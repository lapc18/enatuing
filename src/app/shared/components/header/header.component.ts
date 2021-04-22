import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'common-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() data: any = [];
  @Input() filter: string;


  constructor() { }

  ngOnInit(): void {
  }

}
