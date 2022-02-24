import { FormGroup, FormBuilder, Validators, FormControl, FormArray, FormGroupDirective } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ExternalExpressionInitializer, FormExpressionDto } from '../../models/expression.model';
import { ExpressionsService } from 'src/app/study/services/expressions.service';
import { ExternalExpression } from 'src/app/study/models/expression.model';
import { TagsService } from 'src/app/study/services/tags.service';
import { SpinnerService } from '../../../shared/components/spinner/spinner.service';
import { ExpressionFormService } from './expression-form.service';

@Component({
  selector: 'app-expression-form',
  templateUrl: './expression-form.component.html',
  styleUrls: ['./expression-form.component.scss']
})
export class ExpressionFormComponent implements OnInit {
  public form = new FormGroup({});
  public externalExpressions: ExternalExpression[] = [];
  public currentExternalExpression: ExternalExpression = new ExternalExpressionInitializer();
  public formActiveArea: 'expression' | 'englishMeaning' | 'japaneseMeaning' | 'exampleSentences' | 'lesson' | 'none' = 'expression';

  @Output() formData = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
              private expressionsService: ExpressionsService,
              private tagsService: TagsService,
              private spinner: SpinnerService,
              private snackBar: MatSnackBar,
              private expressionFormService: ExpressionFormService) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  setFormActiveArea(area: 'expression' | 'englishMeaning' | 'japaneseMeaning' | 'exampleSentences' | 'lesson' | 'none') {
    this.formActiveArea = area;
  }

  get englishMeaning(): FormArray {
    return this.form.controls['englishMeaning'] as FormArray;
  }

  get japaneseMeaning(): FormArray {
    return this.form.controls['japaneseMeaning'] as FormArray;
  }

  get exampleSentences(): FormArray {
    return this.form.controls['exampleSentences'] as FormArray;
  }

  addToFormArray(formArray: string, content?: string) {
    const form = this.form.controls[formArray] as FormArray;
    if (formArray === 'exampleSentences') {
      form.push(new FormGroup({
        sentence: new FormControl(''),
        source: new FormControl(''),
      }))
    } else {
      form.push(new FormGroup({ meaning: new FormControl( content ? content : '' ) }))
    }
  }

  deleteFromFormArray(formArray: string, index: any) {
    const form = this.form.controls[formArray] as FormArray;
    form.removeAt(index);
  }

  cleanValuesFromFormArray(formArray: string) {
    const form = this.form.controls[formArray] as FormArray;
    const length = form.length;
    for (let i = 0; i < length; i++) {
      form.removeAt(0);
    }
  }

  autocomplete() {
    this.spinner.open();
    this.expressionsService.getExpressionExternalData(this.form.get('word')?.value).subscribe({
      next: (res) => {
        this.spinner.close();
        this.externalExpressions = res;
        if (this.externalExpressions.length > 0) {
          this.currentExternalExpression = this.externalExpressions[0];
          this.form.get('reading')?.setValue(this.currentExternalExpression.reading);
          this.cleanValuesFromFormArray('englishMeaning');
          this.currentExternalExpression.englishMeaning.forEach((meaning, i) => {
            this.addToFormArray('englishMeaning', meaning)
          })
          this.addToFormArray('englishMeaning');
          this.form.get('jlpt')?.setValue(this.currentExternalExpression.jlpt)
          this.form.get('transitivity')?.setValue(this.currentExternalExpression.transitivity);
        } else {
          this.snackBar.open('Nothing found', 'Try another spelling', { duration: 4000 });
        }
      }, error: () => {
        this.spinner.close();
        this.externalExpressions = [];
      }
    })
  }

  async sendData() {
    const formExpression = this.expressionFormService.generateFormExpressionObject(this.form.value);
    this.formData.emit(formExpression);
  }

  createForm() {
    this.form = this.formBuilder.group({
      word: ['', Validators.required],
      reading: [''],
      englishMeaning: this.formBuilder.array([
        new FormGroup({ meaning: new FormControl('') })
      ]),
      japaneseMeaning: this.formBuilder.array([
        new FormGroup({ meaning: new FormControl('') })
      ]),
      exampleSentences: this.formBuilder.array([
        new FormGroup({
          sentence: new FormControl(''),
          source: new FormControl('')
        })
      ]),
      jlpt: [null],
      transitivity: [null],
      lesson: [''],
      tags: ['']
    })
  }

  cleanForm() {
    this.createForm();
  }

  setRandomWord() {
    const currentExpression = this.form.get('word')?.value;
    const newRandomExpression = this.expressionFormService.getRandomJapaneseExpression(currentExpression)
    this.form.get('word')?.setValue(newRandomExpression);
  }
}
