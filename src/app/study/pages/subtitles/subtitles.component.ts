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
      const { anime, season, number } = params;
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
                console.log(res)
              }
            }, error: () => {
              this.spinner.close();
            }
          }
        )
      }
    })
  }
}
