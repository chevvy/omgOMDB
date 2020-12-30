export interface Movie {
  'Title': string;
  'Year': string;
  'imdbID': number;
  'Poster': string;
  'Type': string;
}

export interface Movies {
  'Search': Movie[];
}

export interface MovieDetails extends Movie{
  'Plot': string;
  'Metascore': number;
}
