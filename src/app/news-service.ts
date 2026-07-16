import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Article, NewsData } from './news-data';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'https://eventregistry.org/api/v1/article/getArticles';

  private articlesSubject = new BehaviorSubject<Article[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public articles$: Observable<Article[]> = this.articlesSubject.asObservable();
  public loading$: Observable<boolean> = this.loadingSubject.asObservable();

  public loadArticles(keyword?: string, categoryUri?: string): void {
    this.loadingSubject.next(true);

    let params = new HttpParams()
      .set('apiKey', environment.apiKey)
      .set('resultType', 'articles')
      .set('articlesCount', '30') // 30 Artikel reichen für das Dashboard
      .set('lang', 'deu') // 'deu' für Deutsch, 'eng' für Englisch
      .set('articlesSortBy', 'date'); // Neueste zuerst

    if (keyword && keyword.trim() !== '') {
      params = params.set('keyword', keyword.trim());
    }

    if (categoryUri && categoryUri.trim() !== '') {
      params = params.set('categoryUri', categoryUri.trim());
    }

    this.http
      .get<NewsData>(this.apiUrl, { params })
      .pipe(
        map((response) => response.articles?.results || []),

        catchError((error) => {
          console.error('Fehler beim Abrufen der Event Registry API:', error);

          return of([]);
        }),
      )
      .subscribe({
        next: (articles: Article[]) => {
          this.articlesSubject.next(articles);
          this.loadingSubject.next(false);
        },
        error: () => {
          this.loadingSubject.next(false);
        },
      });
  }

  public getArticleByUri(uri: string): Article | undefined {
    return this.articlesSubject.value.find((article) => article.uri === uri);
  }
}
