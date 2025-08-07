import { Component } from '@angular/core';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { Episode } from '../../models/subtitle-word';
import { SubtitlesService } from '../../services/subtitles.service';

@Component({
  selector: 'app-subtitles',
  templateUrl: './subtitles.component.html',
  styleUrl: './subtitles.component.scss'
})
export class SubtitlesComponent {
  public episode: Episode | null = null;
  public episodeNotFound = false;

  constructor(private spinner: SpinnerService,
    private route: ActivatedRoute,
    private subtitlesService: SubtitlesService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const { anime, season, number, startTime } = params;
      if (anime && season && number) {
        this.spinner.open();
        this.subtitlesService.getEpisode(anime, season, number).subscribe(
          {
            next: (res) => {
              this.spinner.close();
              if (res == null) {
                this.episodeNotFound = true;
              } else {
                this.episode = res;
                setTimeout(() => this.scrollToText(startTime), 100);
              }
            }, error: () => {
              this.spinner.close();
            }
          }
        )
      }
    })
  }

  scrollToText(text: string) {
    const elements = document.getElementsByName('startTime');
    for (const el of Array.from(elements)) {
      if (el.textContent?.includes(text)) {
        el.classList.add('highlight');
        window.scrollTo({
          top: el.getBoundingClientRect().top  + window.scrollY - 100,
          behavior: 'smooth'
        });
      }
    }
  }
}
