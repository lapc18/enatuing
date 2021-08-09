import domtoimage from 'dom-to-image';
import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FileType } from 'src/app/core/models/enat.models';
import { ExportService } from 'src/app/core/services/export.service';

@Component({
  selector: 'nortic-stamp',
  templateUrl: './nortic-stamp.component.html',
  styleUrls: ['./nortic-stamp.component.scss']
})
export class NorticStampComponent implements OnInit, AfterViewInit {
  @ViewChild('stamp') stamp: ElementRef;

  @Input() stampCode: string;
  @Input() stampCodeColor?: string = '#8c8c8c';
  @Input() color: string;
  @Input() backgroundColor: string;
  @Input() year: string;
  @Input() nortic: string;
  @Output() onConvertToBlob:EventEmitter<any> = new EventEmitter();

  public codeDigitDegrees: [string, number][];

  constructor(private exportService: ExportService) { }

  ngOnInit(): void {
    this.setCodeDigitDegrees();
  }

  ngAfterViewInit(): void {
    this.exportAsBlob();
  }

  setCodeDigitDegrees(): void {
    const codeAreaDegrees = 75 / this.stampCode.length,
      digitDegreeList: [string, number][] = [];
    let origin = 0;

    this.stampCode.split('').forEach(digit => {
      digitDegreeList.push([digit, origin]);
      origin += codeAreaDegrees;
    });

    this.codeDigitDegrees = digitDegreeList;
  }

  exportImage(): void {
    const node = this.stamp.nativeElement,
      blobOptions = { width: 250, height: 250, bgColor: '#ffffff' };
    domtoimage
      .toBlob(node, blobOptions)
      .then(this.saveAsPng.bind(this));
  }

  exportAsBlob(): void {
    const fileName: string = `nortic-${this.nortic}-${this.year}-${this.stampCode}`;
    const node = this.stamp.nativeElement;
    let blobOptions = { width: 250, height: 250, bgColor: '#ffffff' };
    domtoimage.toBlob(node, blobOptions).then((active:Blob) => {
      this.backgroundColor = '#7e7e7e';
      domtoimage.toBlob(node, blobOptions).then((inactive:Blob) => {
        this.onConvertToBlob.emit({ fileName: fileName, active: active, inactive: inactive });
        this.backgroundColor = '#fff';
      })
    });
  }

  saveAsPng(blob: Blob): void {
    const fileName: string = `nortic-${this.nortic}-${this.year}-${this.stampCode}`;
    this.exportService.saveToFile(FileType.htmlPng, blob, fileName);
  }
}
