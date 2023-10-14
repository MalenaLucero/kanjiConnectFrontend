import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Difficulty } from 'src/app/shared/models/custom-types.model';

@Component({
  selector: 'app-edit-difficulty',
  templateUrl: './edit-difficulty.component.html',
  styleUrls: ['./edit-difficulty.component.scss']
})
export class EditDifficultyComponent {
  public form: FormGroup;
  @Output() updatedValue = new EventEmitter();
  @Input() set currentValue(value: Difficulty) {
    this.form.get('difficulty')?.setValue(value);
  }

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      difficulty: []
    })
  }

  cancel() {
    this.updatedValue.emit('cancel');
  }

  confirm() {
    this.updatedValue.emit(this.form.get('difficulty')?.value[0])
  }

}
