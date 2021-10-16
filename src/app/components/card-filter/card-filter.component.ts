import { Transitivity } from './../../models/custom-types.model';
import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Tag } from 'src/app/models/tag.model';
import { Lesson } from 'src/app/models/lesson.model';
import { CardFilter } from 'src/app/models/card-filter.model';
import { DataType } from 'src/app/models/custom-types.model';
import { SelectValuesService } from 'src/app/services/select-values.service';

@Component({
  selector: 'app-card-filter',
  templateUrl: './card-filter.component.html',
  styleUrls: ['./card-filter.component.scss']
})
export class CardFilterComponent implements OnInit, OnChanges {
  @Output() filter = new EventEmitter();
  @Input() tags: Tag[] = [];

  public filterForm: FormGroup;
  public panelOpenState: boolean = true;
  public types: { name: string, value: DataType }[] = [{ name: '', value: 'expression'}];

  constructor(private formBuilder: FormBuilder,
              private selectValuesService: SelectValuesService) {
    this.types = this.selectValuesService.getDataType();
    this.filterForm = this.formBuilder.group({
      type: [this.types[0].value],
      lesson: [''],
      tags: this.formBuilder.group({})
    })
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.tags && changes.tags.currentValue.length > 0) {
      const tagsForm = this.filterForm.get('tags') as FormGroup;
      this.tags.forEach(tag => {
        tagsForm.addControl(tag.name, new FormControl(false))
      })
    }
  }

  generateFilter() {
    const cardFilter: CardFilter = { user: '61478fb9b2cfde16186509b5' };
    cardFilter.type = this.filterForm.get('type')?.value;
    if (this.filterForm.get('lesson')?.value !== '') {
      cardFilter.lesson = this.filterForm.get('lesson')?.value;
    }
    const tagsFormValues = this.filterForm.get('tags')?.value;
    const checkedTags: string[] = Object.keys(tagsFormValues).filter(key =>
      tagsFormValues[key] ? key : null
    );
    if (checkedTags.length > 0) {
      const tagIds: string[] = checkedTags.map(checkedTag => {
        const tagObject = this.tags.find(tag => tag.name === checkedTag);
        return tagObject ? tagObject._id : '';
      })
      cardFilter.tags = tagIds;
    }
    return cardFilter;
  }

  sendFilter() {
    const filter = this.generateFilter();
    this.panelOpenState = false;
    this.filter.emit(filter);
  }

}
