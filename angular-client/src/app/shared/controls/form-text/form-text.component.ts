import { Component, OnInit, AfterViewInit, Input, Output, forwardRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

//creates ngModel accessor to be used in components provider
const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FormTextComponent),
  multi: true
};

@Component({
  selector: 'form-text',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  styleUrls: ['form-text.component.css'],
  template: `
     <div class="form-group form-group-sm" [ngClass]="{'has-error': control.errors}">
        <label class="col-sm-3 control-label custom-label">{{label}}</label>
        <div class="col-sm-9">
          <input class="form-control" type='text' [(ngModel)]="value" />
        </div>
      </div>
  `
})
export class FormTextComponent implements ControlValueAccessor {

  @Input() label: string;
  @Input() control: FormControl;

  // a private variable to store the value of input in our component
  private _value: any = '';

  // get value for component from private variable
  get value(): any { return this._value; };
  // set the value (emit) to the parent model
  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }
  // write the value to the input
  writeValue(value: any) {
    if (value != undefined) {
      this._value = value;
      this.onChange(value);
    }
  }

  onChange = (_) => { };
  onTouched = () => { };
  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  hasError(){
    return this.control.errors;
  }
  isErrorVisible(error: string) {
    return this.control.errors && this.control.errors[error];
  }
}