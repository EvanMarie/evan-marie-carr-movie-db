import { Movie } from "./movie";

export interface Genre {
  id: string;
  title: string;
  movies: Movie[]; // Array of movies in each genre
}

export interface GenreResponse {
  data: Genre[]; // Array of genres
  totalPages: number; // Total number of pages
}
