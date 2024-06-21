import { Component, Inject, OnInit } from '@angular/core';
import { KanjiService } from '../../services/kanji.service';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { ExpandedKanji } from '../../models/expanded-kanji.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-kanji-groups',
  templateUrl: './kanji-groups.component.html',
  styleUrl: './kanji-groups.component.scss'
})
export class KanjiGroupsComponent implements OnInit {
  public kanji = '';
  public expandedKanji: ExpandedKanji | null = null;
  public kanjiNotFound = false;

  constructor(private kanjiService: KanjiService,
    private spinner: SpinnerService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['kanji']) {
        this.kanjiSearch(params.kanji)
      }
    })
  }

  search() {
    this.router.navigate(['/study/kanji-groups'], { queryParams: {['kanji']: this.kanji} });
  }

  kanjiSearch(kanji: string) {
    this.spinner.open();
    this.expandedKanji = null;
    this.kanjiNotFound = false;
    this.kanjiService.getExpandedKanji(kanji).subscribe(
      {
        next: (res) => {
          this.spinner.close();
          if (res === 'Kanji not found') {
            this.kanjiNotFound = true;
            this.expandedKanji = null;
          } else {
            this.expandedKanji = res;
          }
        }, error: () => {
          this.spinner.close();
        }
      }
    )
  }

  filterKanji(kanjis: string[]) {
    const kanjisToSearch = kanjis.toString();
    const link = 'https://kanji-connect.vercel.app/study/manage/user-kanji?search=' + kanjisToSearch;
    window.open(link, "_blank");
  }

}
