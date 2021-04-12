import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { CardsComponent } from './components/cards/cards.component';
import { NavbarComponent } from './components/navbar/navbar.component';



@NgModule({
  declarations: [
    FooterComponent,
    CardsComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
