import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { Expression } from '../../models/expression.model';
import { ExpressionsService } from '../../services/expressions.service';
import { ManageExpressionsService } from './manage-expressions.service';

@Component({
  selector: 'app-manage-expressions',
  templateUrl: './manage-expressions.component.html',
  styleUrls: ['./manage-expressions.component.scss', './../manage-user-kanji/manage-user-kanji.component.scss']
})
export class ManageExpressionsComponent implements OnInit {
  public panelOpenState = true;
  public searchForm: UntypedFormGroup;
  public filteredExpressions: Expression[] = [];
  public columnTitles: string[] = ['word', 'reading', 'englishMeaning'];

  constructor(private formBuilder: FormBuilder,
              private expressionsService: ExpressionsService,
              private manageExpressionsService: ManageExpressionsService,
              private spinner: SpinnerService) {
    this.searchForm = this.formBuilder.group({
      jlpt: null,
      lesson: [''],
      tags: ['']
    })
  }

  ngOnInit(): void {
  }

  search() {
    this.spinner.open();
    const filter = this.manageExpressionsService.generateFilter(this.searchForm.value);
    this.expressionsService.filterExpressions(filter).subscribe(
      res => {
        this.filteredExpressions = res;
        this.spinner.close();
      }
    )
  }

}
