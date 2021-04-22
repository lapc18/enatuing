import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DragScrollModule } from 'ngx-drag-scroll';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SummaryCardComponent } from './components/summary-card/summary-card.component';
import { MaterialModule } from '../material.module';
import { VerticalBarChartComponent } from './components/vertical-bar-chart/vertical-bar-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { HorizontalBarChartComponent } from './components/horizontal-bar-chart/horizontal-bar-chart.component';
import { ChartWrapperComponent } from './components/chart-wrapper/chart-wrapper.component';
import { MixedPieChartComponent } from './components/mixed-pie-chart/mixed-pie-chart.component';
import { StatisticsCardComponent } from './components/statistics-card/statistics-card.component';
import { StatisticsCarouselComponent } from './components/statistics-carousel/statistics-carousel.component';
import { DragableStatisticCarouselComponent } from './components/dragable-statistic-carousel/dragable-statistic-carousel.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SummaryCardComponent,
    VerticalBarChartComponent,
    HorizontalBarChartComponent,
    PieChartComponent,
    ChartWrapperComponent,
    MixedPieChartComponent,
    StatisticsCardComponent,
    StatisticsCarouselComponent,
    DragableStatisticCarouselComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgxChartsModule,
    DragScrollModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    SummaryCardComponent,
    VerticalBarChartComponent,
    HorizontalBarChartComponent,
    PieChartComponent,
    MixedPieChartComponent,
    StatisticsCardComponent,
    StatisticsCarouselComponent,
    DragableStatisticCarouselComponent
  ]
})
export class SharedModule { }
