import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { NewsData } from '../news-data';
import { NewsService } from '../news-service';

@Component({
  selector: 'app-news-detail',
  standalone: true,

  imports: [MatCardModule, RouterLink],

  templateUrl: './news-detail.html',

  styleUrl: './news-detail.css',
})
export class NewsDetail {
  private route = inject(ActivatedRoute);

  private newsService = inject(NewsService);

  article?: NewsData;

  // constructor() {
  //   const id = Number(this.route.snapshot.paramMap.get('id'));

  //   this.article = this.newsService.getArticleId(id);
  // }
}
