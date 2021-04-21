import { EventEmitter } from "@angular/core";

export interface ChartItem {
    name: string;
    value: number;
    hexColor: string;
}

export interface ChartColorScheme {
    domain: string[];
}

export interface Chart {
    title?: string;
    showLegend?: boolean;
    chartItems: ChartItem[];
    colorScheme: ChartColorScheme;
    onSelect: EventEmitter<any>;
}

export interface BarChart {
    xAxisLabel?: string;
    yAxisLabel?: string;
    showXAxisLabel: boolean;
    showYAxisLabel: boolean;
    showXAxis: boolean;
    showYAxis: boolean;
}