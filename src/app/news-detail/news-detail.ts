import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Article } from '../news-data';
import { NewsService } from '../news-service';

@Component({
  selector: 'app-news-detail',
  standalone: true,

  imports: [RouterLink, MatCardModule, MatButtonModule],

  templateUrl: './news-detail.html',

  styleUrl: './news-detail.css',
})
export class NewsDetail {
  private route = inject(ActivatedRoute);

  private newsService = inject(NewsService);

  article: Article | undefined;

  constructor() {
    const uri = this.route.snapshot.paramMap.get('id') ?? '';

    this.article = this.newsService.getArticleByUri(uri);
  }
}
