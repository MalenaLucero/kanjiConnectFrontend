import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormTag } from '../../models/tag.model';

@Component({
  selector: 'app-tag-form',
  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.scss']
})
export class TagFormComponent implements OnInit {
  public tagForm: FormGroup;
  @Output() formData = new EventEmitter<FormTag>();

  constructor(private formBuilder: FormBuilder) {
    this.tagForm = this.formBuilder.group({
      name: [''],
      description: ['']
    })
  }

  ngOnInit(): void {
  }

  uploadTag() {
    this.formData.emit(this.tagForm.value);
    this.tagForm.reset();
  }

}
