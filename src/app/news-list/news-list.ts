import { Component, inject } from '@angular/core';
import { NewsCard } from '../news-card/news-card';
import { Filter } from '../filter/filter';
import { Article } from '../../models/article.model';
import { NewsService } from '../../services/news-service';

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
    this.articles = this.newsService.getAllArticles();
  }

  filterChanged(value: string): void {
    if (value === 'All') {
      this.articles = this.newsService.getAllArticles();
    } else {
      this.articles = this.newsService.filterByCategory(value);
    }
  }
}
