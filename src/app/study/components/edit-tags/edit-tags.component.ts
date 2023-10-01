import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-tags',
  templateUrl: './edit-tags.component.html',
  styleUrls: ['./edit-tags.component.scss']
})
export class EditTagsComponent {
  public form: FormGroup;

  @Output() emit = new EventEmitter();
  @Input() set currentTags(value: string[]) {
    if (value.length > 0) {
      const checkboxState: { [key: string]: boolean } = {};
      value.forEach(key => checkboxState[key] = true )
      const tagsForm = this.form.controls['tags'] as UntypedFormGroup;
      tagsForm.setValue(checkboxState);
    }
  }

  constructor(private formBuilder: UntypedFormBuilder) {
    this.form = this.formBuilder.group({
      tags: ['']
    })
  }

  cancel() {
    this.emit.emit('cancel');
  }

  confirm() {
    this.emit.emit(this.form.get('tags')?.value);
  }

}
