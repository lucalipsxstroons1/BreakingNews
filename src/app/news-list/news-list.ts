import { Component, inject, signal } from '@angular/core';
import { NewsCard } from '../news-card/news-card';
import { Filter } from '../filter/filter';
import { Article } from '../news-data';
import { NewsService } from '../news-service';

// Event Registry erwartet dmoz-Kategorie-URIs, keine UI-Labels.
const CATEGORY_URIS: Record<string, string> = {
  Tech: 'dmoz/Computers',
  Business: 'dmoz/Business',
  Sports: 'dmoz/Sports',
};

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

  filterChanged(category: string): void {
    this.newsService.loadArticles(undefined, CATEGORY_URIS[category]);
  }

  searchChanged(term: string): void {
    this.newsService.loadArticles(term);
  }
}
