import { Component, OnInit } from '@angular/core';
import { CardTemplate } from 'src/app/core/models/enat.models';
import { SliderCard, StatisticsCard } from 'src/app/shared/models/shared.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  goals = [
    {
      title: 'Cantidad para llegar la la meta 1',
      subtitle: 'Organismos nuevos 1',
      content: '75,000',
      template: CardTemplate.goal,
      materialIconName: 'article'
    },
    {
      title: 'Cantidad para llegar la la meta 2',
      subtitle: 'Organismos nuevos 2',
      content: '75,000',
      template: CardTemplate.goal,
      materialIconName: 'article'
    },
    {
      title: 'Cantidad para llegar la la meta 3',
      subtitle: 'Organismos nuevos 3',
      content: '75,000',
      template: CardTemplate.goal,
      materialIconName: 'article'
    },
    {
      title: 'Cantidad para llegar la la meta 4',
      subtitle: 'Organismos nuevos 4',
      content: '75,000',
      template: CardTemplate.goal,
      materialIconName: 'article'
    },
    {
      title: 'Cantidad para llegar la la meta 5',
      subtitle: 'Organismos nuevos 5',
      content: '75,000',
      template: CardTemplate.goal,
      materialIconName: 'article'
    },
    {
      title: 'Cantidad para llegar la la meta 5',
      subtitle: 'Organismos nuevos 6',
      content: '75,000',
      template: CardTemplate.goal,
      materialIconName: 'article'
    }
  ]

  statistics: SliderCard[] = [
    {
      title: 'Nortic A1',
      content: '75,000',
      type: CardTemplate.statistic,
      iconUrl: 'http://optic.gob.do/nortic/images/sello_nortic.png'
    },
    {
      title: 'Nortic A2',
      content: '75,000',
      type: CardTemplate.statistic,
      iconUrl: 'http://optic.gob.do/nortic/images/sello_nortic.png'
    },
    {
      title: 'Nortic A3',
      content: '75,000',
      type: CardTemplate.statistic,
      iconUrl: 'http://optic.gob.do/nortic/images/sello_nortic.png'
    },
    {
      title: 'Nortic A4',
      content: '75,000',
      type: CardTemplate.statistic,
      iconUrl: 'http://optic.gob.do/nortic/images/sello_nortic.png'
    },
    {
      title: 'Nortic A5',
      content: '75,000',
      type: CardTemplate.statistic,
      iconUrl: 'http://optic.gob.do/nortic/images/sello_nortic.png'
    },
    {
      title: 'Nortic A5',
      content: '75,000',
      type: CardTemplate.statistic,
      iconUrl: 'http://optic.gob.do/nortic/images/sello_nortic.png'
    }
  ]

  userCertifications = [
    { name: 'Nortic A1', value: 2, hexColor: 'burlywood' },
    { name: 'Nortic A2', value: 4, hexColor: 'cadetblue' },
    { name: 'Nortic A3', value: 1, hexColor: 'coral' },
    { name: 'Nortic A4', value: 5, hexColor: 'dodgerblue' },
    { name: 'Nortic A7', value: 7, hexColor: 'gold' }
  ]

  statisticCarouselData: StatisticsCard[];

  constructor() { }

  ngOnInit(): void { }

}
