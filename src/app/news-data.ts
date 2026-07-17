export interface NewsData {
  articles: {
    results: Article[];
  };
}

export interface Article {
  uri: string; // Eindeutige ID
  title: string; // Headline
  body: string; // Artikeltext
  image: string; // URL zum Vorschaubild
  url: string; // Link zum Original-Artikel
  date: string; // Veröffentlichungsdatum
  source: Source; // Infos zur Quelle
}

export interface Source {
  uri: string;
  title: string; // z.B. "BBC News" oder "Spiegel"
}
