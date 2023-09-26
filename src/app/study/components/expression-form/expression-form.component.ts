import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormControl, UntypedFormArray } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ExternalExpressionInitializer, FormExpressionDto } from '../../models/expression.model';
import { ExpressionsService } from 'src/app/study/services/expressions.service';
import { ExternalExpression } from 'src/app/study/models/expression.model';
import { TagsService } from 'src/app/study/services/tags.service';
import { SpinnerService } from '../../../shared/components/spinner/spinner.service';
import { LinksService } from '../../services/links.service';

@Component({
  selector: 'app-expression-form',
  templateUrl: './expression-form.component.html',
  styleUrls: ['./expression-form.component.scss']
})
export class ExpressionFormComponent implements OnInit {
  public form = new UntypedFormGroup({});
  public externalExpressions: ExternalExpression[] = [];
  public currentExternalExpression: ExternalExpression = new ExternalExpressionInitializer();
  public formActiveArea: 'expression' | 'englishMeaning' | 'japaneseMeaning' | 'exampleSentences' | 'lesson' | 'none' = 'expression';

  @Output() formData = new EventEmitter();

  constructor(private formBuilder: UntypedFormBuilder,
              private expressionsService: ExpressionsService,
              private tagsService: TagsService,
              private spinner: SpinnerService,
              private snackBar: MatSnackBar,
              private linksService: LinksService) {
    this.createForm();
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.form.controls.word.valueChanges.subscribe(value => {
        this.expressionsService.filterExpressions({ searchList: [value]})
          .subscribe(res => {
            if (res.length !== 0) {
              const url = this.linksService.searchExpression(res[0].word);
              window.open(url, "_blank");
            }
          })
      })
    }
  }

  setFormActiveArea(area: 'expression' | 'englishMeaning' | 'japaneseMeaning' | 'exampleSentences' | 'lesson' | 'none') {
    this.formActiveArea = area;
  }

  get englishMeaning(): UntypedFormArray {
    return this.form.controls['englishMeaning'] as UntypedFormArray;
  }

  get japaneseMeaning(): UntypedFormArray {
    return this.form.controls['japaneseMeaning'] as UntypedFormArray;
  }

  get exampleSentences(): UntypedFormArray {
    return this.form.controls['exampleSentences'] as UntypedFormArray;
  }

  addToFormArray(formArray: string, content?: string) {
    const form = this.form.controls[formArray] as UntypedFormArray;
    if (formArray === 'exampleSentences') {
      form.push(new UntypedFormGroup({
        sentence: new UntypedFormControl(''),
        source: new UntypedFormControl(''),
      }))
    } else {
      form.push(new UntypedFormGroup({ meaning: new UntypedFormControl( content ? content : '' ) }))
    }
  }

  deleteFromFormArray(formArray: string, index: any) {
    const form = this.form.controls[formArray] as UntypedFormArray;
    form.removeAt(index);
  }

  cleanValuesFromFormArray(formArray: string) {
    const form = this.form.controls[formArray] as UntypedFormArray;
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
    const tagsObject = this.form.get('tags')?.value;
    const tagNames = Object.keys(tagsObject).filter(key => tagsObject[key])
    const tagIds = await this.tagsService.getTagIds(tagNames);

    const formExpression: FormExpressionDto = {
      ...this.form.value,
      englishMeaning: this.englishMeaning.getRawValue()
        .filter(e => e.meaning !== null && e.meaning.length !== 0).map(e => e.meaning),
      japaneseMeaning: this.japaneseMeaning.getRawValue()
        .filter(e => e.meaning !== null && e.meaning.length !== 0).map(e => e.meaning),
      exampleSentences: this.exampleSentences.getRawValue()
        .filter(e => e.sentence !== null && e.sentence.length !== 0),
      tags: tagIds
    }
    this.formData.emit(formExpression);
  }

  createForm() {
    this.form = this.formBuilder.group({
      word: ['', Validators.required],
      reading: [''],
      englishMeaning: this.formBuilder.array([
        new UntypedFormGroup({ meaning: new UntypedFormControl('') })
      ]),
      japaneseMeaning: this.formBuilder.array([
        new UntypedFormGroup({ meaning: new UntypedFormControl('') })
      ]),
      exampleSentences: this.formBuilder.array([
        new UntypedFormGroup({
          sentence: new UntypedFormControl(''),
          source: new UntypedFormControl('')
        })
      ]),
      jlpt: [null],
      transitivity: [null],
      lesson: [''],
      tags: [''],
      notes: '',
    })
  }

  cleanForm() {
    const lesson = this.form.value.lesson;
    this.createForm();
    this.form.controls['lesson'].setValue(lesson);
  }

  getRandomWord() {
    const words = ['周囲', '理解', 'お屋敷', '地味', '仕事', '整頓', '主人', 'お客様', '好み', '調味料', '食材', '掃除', '気分'];
    const randomWord = words[Math.floor(Math.random()*words.length)];
    if (randomWord !== this.form.get('word')?.value) {
      this.form.get('word')?.setValue(randomWord);
    } else {
      this.getRandomWord();
    }
  }
}
