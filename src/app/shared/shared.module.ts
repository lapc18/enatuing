import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SummaryCardComponent } from './components/summary-card/summary-card.component';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SummaryCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ], 
  exports: [
    FooterComponent,
    HeaderComponent,
    SummaryCardComponent
  ]
})
export class SharedModule { }
