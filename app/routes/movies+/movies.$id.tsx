import { useParams } from "@remix-run/react";
import { fetchMovieById } from "~/utils/movies-api";
import { Movie } from "./interfaces/movie";

export default function ViewMovie() {
  const { movieId } = useParams();
  const movie = fetchMovieById(movieId || "");
  console.log(movie);
  return (
    <div>
      <h1>MOVIE</h1>
    </div>
  );
}
