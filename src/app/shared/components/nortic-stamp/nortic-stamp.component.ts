import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

@Component({
  selector: 'nortic-stamp',
  templateUrl: './nortic-stamp.component.html',
  styleUrls: ['./nortic-stamp.component.scss']
})
export class NorticStampComponent implements OnInit {
  @ViewChild('stamp') stamp: ElementRef;

  @Input() color: string = '#4794cc';
  @Input() bgColor: string = '#ffffff';
  @Input() stampCode: string = '13-001-01-A20001';
  @Input() stampCodeColor: string = '#8c8c8c';

  public codeDigitDegrees: [string, number][];

  constructor() { }

  ngOnInit(): void {
    this.setCodeDigitDegrees();
  }

  setCodeDigitDegrees() {
    const codeAreaDegrees = 75 / this.stampCode.length,
      digitDegreeList: [string, number][] = [];
    let origin = 0;

    this.stampCode.split('').forEach(digit => {
      digitDegreeList.push([digit, origin]);
      origin += codeAreaDegrees;
    });

    this.codeDigitDegrees = digitDegreeList;
  }

  saveStamp(): void {
    const node = this.stamp.nativeElement;

    toJpeg(node, { quality: 0.95 })
    .then(function (dataUrl) {
      var link = document.createElement('a');
      link.download = 'my-image-name.jpeg';
      link.href = dataUrl;
      link.click();
    });
  }
}
