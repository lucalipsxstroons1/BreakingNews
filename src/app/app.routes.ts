import { Routes } from '@angular/router';
import { NewsList } from './news-list/news-list';
import { NewsDetail } from './news-detail/news-detail';

export const routes: Routes = [
  { path: '', component: NewsList },
  { path: 'article/:id', component: NewsDetail },
];
