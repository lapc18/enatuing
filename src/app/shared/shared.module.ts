import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DragScrollModule } from 'ngx-drag-scroll';

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
import { YesOrNoComponent } from './dialogs/yes-or-no/yes-or-no.component';
import { WarningComponent } from './dialogs/warning/warning.component';
import { InformationComponent } from './dialogs/information/information.component';
import { StatisticsCardComponent } from './components/statistics-card/statistics-card.component';
import { StatisticsCarouselComponent } from './components/statistics-carousel/statistics-carousel.component';
import { DragableStatisticCarouselComponent } from './components/dragable-statistic-carousel/dragable-statistic-carousel.component';
import { MultipleCardSliderComponent } from './components/multiple-card-slider/multiple-card-slider.component';

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
    YesOrNoComponent,
    WarningComponent,
    InformationComponent,
    StatisticsCardComponent,
    StatisticsCarouselComponent,
    DragableStatisticCarouselComponent,
    MultipleCardSliderComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxChartsModule,
    DragScrollModule
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
    MixedPieChartComponent,
    YesOrNoComponent,
    WarningComponent,
    InformationComponent,
    StatisticsCardComponent,
    StatisticsCarouselComponent,
    DragableStatisticCarouselComponent,
    MultipleCardSliderComponent
  ]
})
export class SharedModule { }
