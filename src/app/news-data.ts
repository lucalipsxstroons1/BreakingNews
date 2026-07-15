export interface NewsData {
  articles: {
    results: Article[];
  };
}

export interface Article {
  uri: string; // Eindeutige ID (wichtig für's Routing zur Detailseite)
  title: string; // Headline
  body: string; // Artikeltext (Snippet oder voll)
  image: string; // URL zum Vorschaubild (für die mat-card)
  url: string; // Link zum Original-Artikel
  date: string; // Veröffentlichungsdatum
  source: Source; // Infos zur Quelle
}

export interface Source {
  uri: string;
  title: string; // z.B. "BBC News" oder "Spiegel"
}
