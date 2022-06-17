import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Tag } from 'src/app/study/models/tag.model';
import { SelectValuesService } from 'src/app/study/services/select-values.service';
import { CardFilterService } from './card-filter.service';

@Component({
  selector: 'app-card-filter',
  templateUrl: './card-filter.component.html',
  styleUrls: ['./card-filter.component.scss']
})
export class CardFilterComponent implements OnInit {
  @Output() filter = new EventEmitter();
  @Input() tags: Tag[] = [];

  public filterForm: UntypedFormGroup;
  public panelOpenState: boolean = true;

  constructor(private formBuilder: UntypedFormBuilder,
              private selectValuesService: SelectValuesService,
              private cardFilterService: CardFilterService) {
    this.filterForm = this.formBuilder.group({
      type: [this.selectValuesService.getDefaultDataTypeValue()],
      lesson: [''],
      source: [''],
      jlpt: null,
      transitivity: null,
      difficulty: null,
      tags: ['']
    })
  }

  ngOnInit(): void {

  }

  sendFilter() {
    const filter = this.cardFilterService.generateFilter(this.filterForm.value);
    //this.panelOpenState = false;
    this.filter.emit(filter);
  }

}
