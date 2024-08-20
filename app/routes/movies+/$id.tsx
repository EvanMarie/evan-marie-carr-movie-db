import { useLoaderData, useParams } from "@remix-run/react";
import { fetchMovieById } from "~/utils/movies-api";
import { LoaderFunctionArgs } from "@remix-run/node";
import { MovieById } from "./interfaces/movieById";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { id: movieId } = params;
  console.log("Fetching movie with ID:", movieId);
  const movie = await fetchMovieById(movieId!);
  console.log(movie);
  return movie;
};

export default function ViewMovie() {
  const movie = useLoaderData<MovieById>();

  return (
    <div>
      <h1>{movie.title}</h1>
    </div>
  );
}
