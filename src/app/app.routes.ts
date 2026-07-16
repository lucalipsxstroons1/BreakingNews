import { Routes } from '@angular/router';
import { NewsList } from './news-list/news-list';
import { NewsDetail } from './news-detail/news-detail';

export const routes: Routes = [
  { path: '', redirectTo: '/news-list', pathMatch: 'full' },
  { path: 'news-list', component: NewsList },
  { path: 'article/:id', component: NewsDetail },
];
