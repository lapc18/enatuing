import { Component, OnInit } from '@angular/core';
import { DrawerItem, DRAWER_OPTIONS } from 'src/app/core/models/enat.models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public drawerOptions: DrawerItem[] = DRAWER_OPTIONS;

  constructor() { }

  ngOnInit(): void {
  }

}
