import {
  ClientLoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import { fetchMovieById } from "~/utils/movies-api";
import { MovieById } from "./interfaces/movieById";
import FlexFull from "~/buildingBlockComponents/flexFull";
import VStackFull from "~/buildingBlockComponents/vStackFull";
import Box from "~/buildingBlockComponents/box";
import Image from "~/buildingBlockComponents/image";
import Center from "~/buildingBlockComponents/center";
import { imageFallback } from "styles";
import { useState } from "react";
import BouncingDots from "~/buildingBlockComponents/bouncingDots";
import { ExpandableImage } from "~/buildingBlockComponents/expandableImage";
import Transition from "~/buildingBlockComponents/transition";
import { CloseButton } from "~/buildingBlockComponents/closeButton";

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
  const navigate = useNavigate();
  return (
    <Transition className="w-full relatie" type="fadeSlideInRight">
      <CloseButton
        onClose={() => navigate("/movies")}
        className="absolute top-1vh right-1vh"
      />
      <VStackFull className="p-1vh">
        <FlexFull className="flex-col md:flex-row">
          <ExpandableImage
            src={movie.posterUrl || imageFallback}
            caption={movie.title}
          />
          <h1>{movie.title || "I ain't go no movie!"}</h1>
        </FlexFull>
        <p>{movie.summary || "No overview available."}</p>
      </VStackFull>
    </Transition>
  );
}
// id: string;
// title: string;
// posterUrl: string;
// rating: string;
// summary: string;
// duration: string;
// directors: string[];
// mainActors: string[];
// datePublished: string;
// ratingValue: number;
// bestRating: number;
// worstRating: number;
// writers: string[];
// genres: Genre[];
