import { ClientLoaderFunctionArgs, useLoaderData } from "@remix-run/react";
import { fetchMovieById } from "~/utils/movies-api";
import { MovieById } from "./interfaces/movieById";

export const clientLoader = async ({ params }: ClientLoaderFunctionArgs) => {
  const { id: movieId } = params;
  console.log("Fetching movie with ID:", movieId);
  const movie = await fetchMovieById(movieId!);
  console.log(movie);
  return movie;
};
clientLoader.hydrate = true;

export default function ViewMovie() {
  const movie = useLoaderData<MovieById>();

  return (
    <div>
      <h1>{movie.title || "I ain't go no movie!"}</h1>
    </div>
  );
}
