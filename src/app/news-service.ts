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
  // Moderner Angular-Standard: inject() statt Constructor-Parameter
  private http = inject(HttpClient);
  private readonly apiUrl = 'https://eventregistry.org/api/v1/article/getArticles';

  // 1. State Management (Internal)
  private articlesSubject = new BehaviorSubject<Article[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  // 2. Public Observables (Darauf lauscht das UI per async-Pipe)
  public articles$: Observable<Article[]> = this.articlesSubject.asObservable();
  public loading$: Observable<boolean> = this.loadingSubject.asObservable();

  /**
   * Lädt Artikel von der Event Registry API basierend auf Suche und Kategorie.
   */
  public loadArticles(keyword?: string, categoryUri?: string): void {
    this.loadingSubject.next(true);

    // WICHTIG: HttpParams in Angular sind immutable (unveränderlich)!
    // Man muss das Ergebnis von .set() immer neu zuweisen.
    let params = new HttpParams()
      .set('apiKey', environment.apiKey)
      .set('resultType', 'articles')
      .set('articlesCount', '30') // 30 Artikel reichen für das Dashboard
      .set('lang', 'deu') // 'deu' für Deutsch, 'eng' für Englisch
      .set('articlesSortBy', 'date'); // Neueste zuerst

    // Dynamische Filter hinzufügen, falls vom User gesetzt
    if (keyword && keyword.trim() !== '') {
      params = params.set('keyword', keyword.trim());
    }

    if (categoryUri && categoryUri.trim() !== '') {
      // Beispiel für Event Registry Kategorie: 'dmoz/Business' oder 'dmoz/Computers'
      params = params.set('categoryUri', categoryUri.trim());
    }

    // Der HTTP Request & die RxJS-Pipeline
    this.http
      .get<NewsData>(this.apiUrl, { params })
      .pipe(
        // A) MAP: Wir schneiden die Hülle der API ab und reichen nur das Article-Array weiter
        map((response) => response.articles?.results || []),

        // B) CATCH ERROR: Falls der API-Key abgelaufen ist oder das Limit greift
        catchError((error) => {
          console.error('Fehler beim Abrufen der Event Registry API:', error);
          // Wir geben ein leeres Array zurück, damit der Stream am Leben bleibt und die App nicht crasht
          return of([]);
        }),
      )
      .subscribe({
        next: (articles: Article[]) => {
          // C) STATE UPDATE: Neue Daten in den Stream pushen -> UI aktualisiert sich automatisch!
          this.articlesSubject.next(articles);
          this.loadingSubject.next(false);
        },
        error: () => {
          // Fallback für den Loading-Spinner
          this.loadingSubject.next(false);
        },
      });
  }

  /**
   * Sucht einen Artikel anhand seiner uri im aktuell geladenen Bestand.
   */
  public getArticleByUri(uri: string): Article | undefined {
    return this.articlesSubject.value.find((article) => article.uri === uri);
  }

  public filterByCategory(categoryUri: string): void {
    // Wir filtern die aktuell geladenen Artikel im State
    const filteredArticles = this.articlesSubject.value.filter(
      (article) => article.source.uri === categoryUri,
    );
    this.articlesSubject.next(filteredArticles);
  }
}
