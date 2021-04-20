import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SummaryCardComponent } from './components/summary-card/summary-card.component';
import { MaterialModule } from '../material.module';
import { VerticalBarChartComponent } from './components/vertical-bar-chart/vertical-bar-chart.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SummaryCardComponent,
    VerticalBarChartComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgxChartsModule,
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    SummaryCardComponent,
    VerticalBarChartComponent
  ]
})
export class SharedModule { }
