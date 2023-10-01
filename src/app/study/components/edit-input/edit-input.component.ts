import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit-input',
  templateUrl: './edit-input.component.html',
  styleUrls: ['./edit-input.component.scss']
})
export class EditInputComponent {
  public data = '';
  public min = 1;
  public max = 1;
  public customLabel = 'Update field';

  @Output() updatedValue = new EventEmitter();

  @Input() set type(value: 'textarea' | 'input') {
    if (value === 'textarea') {
      this.min = 5;
      this.max = 20;
    }
  }

  @Input() set label(value: string) {
    this.customLabel = value;
  }

  @Input() set currentValue(value: string) {
    this.data = value;
  }

  cancel() {
    this.updatedValue.emit('cancel');
  }

  confirm() {
    this.updatedValue.emit(this.data);
  }
}
