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
import VStack from "~/buildingBlockComponents/vStack";

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
    <FlexFull className="h-[100svh] relative sm:p-1vh md:p-1.5vh bg-200-radial4op25">
      <Transition className="w-full sm:p-1vh" type="fadeSlideInRight">
        <FlexFull className="bg-500-radial6op50 sm:border-900-md sm:shadowNarrowNormal h-full ">
          <Box className="absolute top-1vh right-1vh sm:top-2vh sm:right-2vh">
            <CloseButton onClose={() => navigate("/movies")} />
          </Box>
          <FlexFull className="h-full overflow-y-auto overflow-x-hidden insetShadowXxl">
            <VStackFull className="p-1vh sm:p-3vh ">
              <FlexFull className="flex-col lg:flex-row items-center justify-center">
                <ExpandableImage
                  src={movie.posterUrl || imageFallback}
                  caption={movie.title}
                />
                <VStackFull className="p-1vh">
                  <h1>{movie.title || "I ain't go no movie!"}</h1>
                  <p>{movie.summary || "No overview available."}</p>
                  <p>{movie.rating || "No rating available."}</p>
                  <p>{movie.duration || "No duration available."}</p>
                  <p>{movie.datePublished || "No date available."}</p>
                  <p>{movie.directors || "No directors available."}</p>
                  <p>{movie.mainActors || "No actors available."}</p>
                  <p>{movie.writers || "No writers available."}</p>
                  {movie.genres.map((genre, index) => (
                    <p key={index}>{genre.title}</p>
                  ))}
                </VStackFull>
              </FlexFull>
            </VStackFull>
          </FlexFull>
        </FlexFull>
      </Transition>
    </FlexFull>
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
