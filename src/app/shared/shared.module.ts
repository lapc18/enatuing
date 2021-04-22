import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { CardsComponent } from './components/cards/cards.component';
import { HeaderComponent } from './components/header/header.component';
import { CommonTableComponent } from './components/common-table/common-table.component';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FooterComponent,
    CardsComponent,
    HeaderComponent,
    CommonTableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ], 
  exports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FooterComponent,
    CardsComponent,
    HeaderComponent,
    CommonTableComponent
  ]
})
export class SharedModule { }
