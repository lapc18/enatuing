import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { CommonTableComponent } from './components/common-table/common-table.component';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SummaryCardComponent } from './components/summary-card/summary-card.component';
import { VerticalBarChartComponent } from './components/vertical-bar-chart/vertical-bar-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { HorizontalBarChartComponent } from './components/horizontal-bar-chart/horizontal-bar-chart.component';
import { ChartWrapperComponent } from './components/chart-wrapper/chart-wrapper.component';
import { MixedPieChartComponent } from './components/mixed-pie-chart/mixed-pie-chart.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    CommonTableComponent,
    HeaderComponent,
    SummaryCardComponent,
    VerticalBarChartComponent,
    HorizontalBarChartComponent,
    PieChartComponent,
    ChartWrapperComponent,
    MixedPieChartComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxChartsModule,
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FooterComponent,
    HeaderComponent,
    CommonTableComponent,
    HeaderComponent,
    SummaryCardComponent,
    VerticalBarChartComponent,
    HorizontalBarChartComponent,
    PieChartComponent,
    MixedPieChartComponent
  ]
})
export class SharedModule { }
