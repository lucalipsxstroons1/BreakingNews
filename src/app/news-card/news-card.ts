import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Article } from '../models/article.model';

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [MatCardModule, RouterLink],
  templateUrl: './news-card.html',
  styleUrl: './news-card.css',
})
export class NewsCard {
  @Input({ required: true })
  article!: Article;
}
