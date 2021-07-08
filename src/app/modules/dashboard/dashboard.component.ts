import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { User } from 'src/app/core/domain/users/users.models';
import { DrawerItem, DRAWER_OPTIONS } from 'src/app/core/models/enat.models';
import { AuthState } from 'src/app/core/stores/auth/auth.reducer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public drawerOptions: DrawerItem[] = DRAWER_OPTIONS;

  public user: User = null;
  
  constructor(
    private store: Store<{ auth: AuthState }>
  ) {
    this.store.pipe(select(state => state.auth.currentUser)).subscribe(res => this.user = res);
  }

  ngOnInit(): void {
  }

}
