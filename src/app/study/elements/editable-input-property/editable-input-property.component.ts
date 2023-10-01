import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-editable-input-property',
  templateUrl: './editable-input-property.component.html',
  styleUrls: ['./editable-input-property.component.scss']
})
export class EditableInputPropertyComponent {
  @Input() label = '';
  @Input() text = '';
  @Output() emit = new EventEmitter();

  emitOutput(){
    this.emit.emit(true);
  }

}
