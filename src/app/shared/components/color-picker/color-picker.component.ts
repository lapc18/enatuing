import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit {

  @Input() label: string = 'Color';
  @Input() color: string = '#fff';
  @Input() isEnabled: boolean = false;
  @Input() isFormControl: boolean = false;
  @Input() controlName: string = 'colorPicker';
  @Input() parentForm: FormGroup = new FormGroup({[this.controlName]: new FormControl(this.color, [Validators.required])});


  @Output() colorChange: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

}
