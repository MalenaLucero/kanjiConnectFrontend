import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ExpandedKanji } from '../models/expanded-kanji.model';
import { Episode } from '../models/subtitle-word';

@Injectable({
  providedIn: 'root'
})
export class SubtitlesService {

  constructor(private http: HttpClient) { }

  getEpisode(anime: string, season: string, number: string) {
    return this.http.get<Episode>(`${environment.subtitles}/episodes/filter?anime=${anime}&season=${season}&number=${number}`);
  }
}
