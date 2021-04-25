import { EventEmitter } from "@angular/core";
import { CardTemplate } from "src/app/core/models/enat.models";

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
    subtitle?: string;
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

export interface StatisticsCard {
    label: string;
    highlightedText: string;
    iconUrl: string;

}

export interface SliderCard {
    title: string;
    subtitle: string;
    content: string;
    type: CardTemplate;
    materialIconName?: string;
    iconUrl?: string;
}