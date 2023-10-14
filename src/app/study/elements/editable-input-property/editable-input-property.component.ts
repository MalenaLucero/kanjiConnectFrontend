import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Difficulty } from 'src/app/shared/models/custom-types.model';

@Component({
  selector: 'app-editable-input-property',
  templateUrl: './editable-input-property.component.html',
  styleUrls: ['./editable-input-property.component.scss']
})
export class EditableInputPropertyComponent {
  @Input() label = '';
  @Input() text: string | Difficulty = '';
  @Output() emit = new EventEmitter();

  emitOutput(){
    this.emit.emit(true);
  }

}
