import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  chartData = [
    {
      "name": "NORTIC A2",
      "value": 12,
      "hexColor": "#3b6eb9",
    },
    {
      "name": "NORTIC A3",
      "value": 11,
      "hexColor": "#198754"
    },
    {
      "name": "NORTIC A4",
      "value": 3,
      "hexColor": "#60317b"
    },
    {
      "name": "NORTIC A5",
      "value": 2,
      "hexColor": "#ffc107"
    },
    {
      "name": "NORTIC A7",
      "value": 1,
      "hexColor": "#dc3545"
    },
    {
      "name": "NORTIC B2",
      "value": 2,
      "hexColor": "#3c3979"
    },
    {
      "name": "NORTIC E1",
      "value": 11,
      "hexColor": "orange"
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
