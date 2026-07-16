import { Component, inject } from '@angular/core';
import { NewsCard } from '../news-card/news-card';
import { Filter } from '../filter/filter';
import { Article } from '../news-data';
import { NewsService } from '../news-service';

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [NewsCard, Filter],
  templateUrl: './news-list.html',
  styleUrl: './news-list.css',
})
export class NewsList {
  private newsService = inject(NewsService);

  articles: Article[] = [];

  constructor() {
    this.newsService.articles$.subscribe((articles: Article[]) => {
      this.articles = articles;
    });

    this.newsService.loadArticles();
  }

  filterChanged(value: string): void {
    if (value === 'All') {
      this.newsService.loadArticles();
    } else {
      this.newsService.loadArticles(undefined, value);
    }
  }
}
