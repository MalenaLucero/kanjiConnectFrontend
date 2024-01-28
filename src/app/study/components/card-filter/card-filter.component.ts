import { Component, Output, EventEmitter } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { DataType, ReviewType } from 'src/app/shared/models/custom-types.model';
import { SelectValuesService } from 'src/app/study/services/select-values.service';
import { CardFilterService } from './card-filter.service';

@Component({
  selector: 'app-card-filter',
  templateUrl: './card-filter.component.html',
  styleUrls: ['./card-filter.component.scss']
})
export class CardFilterComponent {
  @Output() filter = new EventEmitter();

  public filterForm: UntypedFormGroup;
  public dataTypes: { name: string, value: DataType }[] = [];
  public reviewTypes: { name: string, value: ReviewType }[] = [];

  constructor(private formBuilder: UntypedFormBuilder,
    private selectValuesService: SelectValuesService,
    private cardFilterService: CardFilterService) {
    this.dataTypes = this.selectValuesService.getDataType();
    this.reviewTypes = this.selectValuesService.getReviewTypes();
    this.filterForm = this.formBuilder.group({
      type: [this.selectValuesService.getDefaultDataTypeValue()],
      reviewType: [this.selectValuesService.getReviewTypes()[0].value],
      lesson: [''],
      source: [''],
      jlpt: null,
      transitivity: null,
      difficulty: [''],
      tags: ['']
    })
  }

  sendFilter() {
    const filter = this.cardFilterService.generateFilter(this.filterForm.value);
    this.filter.emit(filter);
  }

}
