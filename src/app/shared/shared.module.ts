import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { CardsComponent } from './components/cards/cards.component';



@NgModule({
  declarations: [
    FooterComponent,
    CardsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
