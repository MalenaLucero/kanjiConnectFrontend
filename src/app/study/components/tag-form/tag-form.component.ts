import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormTag, Tag } from '../../models/tag.model';

@Component({
  selector: 'app-tag-form',
  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.scss']
})
export class TagFormComponent implements OnInit {
  public tagForm: FormGroup;
  public submitText: string = 'Create tag';
  public resetText: string = 'Clean form';
  public color: number = 1;

  @Input() inputTag: Tag | null = null;
  @Output() formData = new EventEmitter<FormTag>();
  @Output() cancel = new EventEmitter<boolean>();

  constructor(private formBuilder: FormBuilder) {
    this.tagForm = this.formBuilder.group({
      name: [''],
      description: ['']
    })
  }

  ngOnInit(): void {
    if (this.inputTag !== null) {
      this.submitText = 'Edit tag';
      this.resetText = 'Cancel';
      this.tagForm.get('name')?.setValue(this.inputTag.name);
      this.tagForm.get('description')?.setValue(this.inputTag.description);
      this.color = this.inputTag.color;
    }
  }

  setColor(color: number) {
    this.color = color;
  }

  submit() {
    const data = { ...this.tagForm.value, color: this.color };
    this.formData.emit(data);
    this.tagForm.reset();
  }

  reset() {
    this.tagForm.reset();
    this.cancel.emit(true);
  }

}
