import { Component } from '@angular/core';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { Episode, WordInSubtitles } from '../../models/subtitle-word';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  public words = '';
  public wordsNotFound = false;
  public expandedResult: WordInSubtitles[] | null = null;

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
    this.router.navigate(['/study/search'], { queryParams: {['words']: this.words} });
  }

  wordsSearch(words: string) {
    this.spinner.open();
    this.expandedResult = null;
    this.wordsNotFound = false;
    this.searchService.getLinesWithIncludedWords(words).subscribe(
      {
        next: (res) => {
          this.spinner.close();
          if (res === 'Word or words not found') {
            this.wordsNotFound = true;
          } else {
            this.expandedResult = res;
          }
        }, error: () => {
          this.spinner.close();
        }
      }
    )
  }

  generateSubtitleLink(episode: Episode) {
    const { anime, season, number } = episode;
    const url = `https://kanji-connect.vercel.app/study/subtitles?anime=${anime}&season=${season}&number=${number}`
    window.open(url, '_blank');
  }
}
