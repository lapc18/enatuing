import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';

@Component({
  selector: 'color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit {

  @Input() color: string = '';
  @Input() isEnabled: boolean = false;


  @Output() colorChange: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

}
