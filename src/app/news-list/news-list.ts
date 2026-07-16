import { Component, inject, signal } from '@angular/core';
import { NewsCard } from '../news-card/news-card';
import { Filter } from '../filter/filter';
import { Article } from '../news-data';
import { NewsService } from '../news-service';

const CATEGORY_URIS: Record<string, string> = {
  Tech: 'news/Technology',
  Business: 'news/Business',
  Sports: 'news/Sports',
  Health: 'news/Health',
  Science: 'news/Science',
  Entertainment: 'news/Arts_and_Entertainment',
  Politics: 'news/Politics',
};

const CATEGORY_KEYWORDS: Record<string, string> = {
  World: 'Welt',
  Travel: 'Reisen',
  Food: 'Essen',
  Lifestyle: 'Lifestyle',
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
    this.newsService.articles$.subscribe((articles) => this.articles.set(articles));
    this.newsService.loadArticles();
  }

  filterChanged(category: string): void {
    if (category in CATEGORY_URIS) {
      this.newsService.loadArticles(undefined, CATEGORY_URIS[category]);
    } else if (category in CATEGORY_KEYWORDS) {
      this.newsService.loadArticles(CATEGORY_KEYWORDS[category]);
    } else {
      this.newsService.loadArticles();
    }
  }

  searchChanged(term: string): void {
    this.newsService.loadArticles(term);
  }
}
