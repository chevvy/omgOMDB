export interface Result {
  'Title': string;
  'Year': string;
  'imdbID': number;
  'Poster': string;
}

export interface SearchResults {
  'Search': Result[];
}

export interface MovieResult extends Result{
  'Plot': string;
  'Metascore': number;
}
