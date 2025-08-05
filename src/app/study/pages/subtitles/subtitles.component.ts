import { Component } from '@angular/core';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-subtitles',
  templateUrl: './subtitles.component.html',
  styleUrl: './subtitles.component.scss'
})
export class SubtitlesComponent {
  public words = '';
  public wordsNotFound = false;

  constructor(private searchService: SearchService,
    private spinner: SpinnerService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['words']) {
        this.wordsSearch(params.words)
      }
    })
  }

  search() {
    //this.router.navigate(['/study/subtitles'], { queryParams: {['words']: this.words} });

    this.wordsSearch('')
  }

  wordsSearch(words: string) {
    this.spinner.open();
    this.wordsNotFound = false;
    // this.searchService.getLinesWithIncludedWords(words.split(',')).subscribe(
    //   {
    //     next: (res) => {
    //       this.spinner.close();
    //       if (res === 'Kanji not found') {
    //         this.wordsNotFound = true;
    //       } else {
    //         console.log(res)
    //       }
    //     }, error: () => {
    //       this.spinner.close();
    //     }
    //   }
    // )

    this.searchService.getAllAnime().subscribe(
      {
        next: (res) => {
          this.spinner.close();
            console.log(res)
        }, error: () => {
          this.spinner.close();
        }
      }
    )
  }
}
