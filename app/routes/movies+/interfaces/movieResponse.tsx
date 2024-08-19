import { Movie } from "./movie";

export interface MoviesResponse {
  data: Movie[];
  totalPages: number;
}
