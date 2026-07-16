import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Article } from '../news-data';
import { NewsData } from '../news-data';

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [RouterLink, MatCardModule],
  templateUrl: './news-card.html',
  styleUrl: './news-card.css',
})
export class NewsCard {
  @Input({ required: true }) article!: Article;
}
