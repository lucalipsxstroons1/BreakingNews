import { Component, inject, signal } from '@angular/core';
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

  articles = signal<Article[]>([]);

  constructor() {
    // loadArticles() populates the service's state asynchronously (HTTP + BehaviorSubject),
    // so we read the results via articles$ instead of a return value. A signal is used
    // (rather than a plain field) so the zoneless view updates when the subscription fires.
    this.newsService.articles$.subscribe((articles) => this.articles.set(articles));
    this.newsService.loadArticles();
  }

  filterChanged(value: string): void {
    if (value === 'All') {
      this.newsService.loadArticles();
    } else {
      this.newsService.filterByCategory(value);
    }
  }
}
