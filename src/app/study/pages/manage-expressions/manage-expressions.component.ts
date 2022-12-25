import { emptyTableData, TableData } from './../../../shared/models/table-data.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { Expression } from '../../models/expression.model';
import { ExpressionsService } from '../../services/expressions.service';
import { ManageExpressionsService } from './manage-expressions.service';
import { TagsService } from '../../services/tags.service';

@Component({
  selector: 'app-manage-expressions',
  templateUrl: './manage-expressions.component.html',
  styleUrls: ['./manage-expressions.component.scss', './../manage-user-kanji/manage-user-kanji.component.scss']
})
export class ManageExpressionsComponent implements OnInit {
  public panelOpenState = true;
  public searchForm: UntypedFormGroup;
  public filteredExpressions: Expression[] = [];
  public tableData: TableData = emptyTableData;
  public tagCombinations: any = [];

  constructor(private formBuilder: FormBuilder,
              private expressionsService: ExpressionsService,
              private manageExpressionsService: ManageExpressionsService,
              private tagsService: TagsService,
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
        this.tableData = this.manageExpressionsService.generateTableData(this.filteredExpressions);
        const tagList = this.filteredExpressions.map(expression => expression.tags)
        const concatTags: string[] = [];
        tagList.forEach(list => list.forEach(tag => concatTags.push(tag)))
        const tagSet = new Set(concatTags)
        const tagCombinations = this.tagsService.getAllPossibleTagCombinations(Array.from(tagSet));
        this.tagCombinations = tagCombinations.map(tagCombination => {
          return {
            tagCombination: this.tagsService.filterTagsById(tagCombination),
            expressions: this.filteredExpressions.filter(expression =>
              expression.tags.length === tagCombination.length &&
              expression.tags.every(tag => tagCombination.includes(tag))
            )
          }
        }).filter(e => e.expressions.length > 0).sort((a, b) => {
          if (a.tagCombination.length < b.tagCombination.length) {
            return -1
          } else {
            return 1
          }
        })
        this.spinner.close();
      }
    )
  }

}
