import { Genre } from "./genre";

export interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  rating: string;
}

export interface MovieById {
  id: string;
  title: string;
  posterUrl: string;
  rating: string;
  summary: string;
  duration: string;
  directors: string[];
  mainActors: string[];
  datePublished: string;
  ratingValue: number;
  bestRating: number;
  worstRating: number;
  writers: string[];
  genres: Genre[];
}

export interface MoviesResponse {
  data: Movie[];
  totalPages: number;
}
