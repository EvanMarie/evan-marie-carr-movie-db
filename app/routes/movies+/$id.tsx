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
import { CloseIcon, imageFallback } from "styles";
import { ExpandableImage } from "~/buildingBlockComponents/expandableImage";
import Transition from "~/buildingBlockComponents/transition";
import { CloseButton } from "~/buildingBlockComponents/closeButton";
import Text from "~/buildingBlockComponents/text";
import FormatDate from "~/utils/formatDate";
import FilmInfoWrap from "./components/filmInfoWrap";
import FormatDuration from "~/utils/formatDuration";
import FilmInfoLabelValue from "./components/filmInfoLabelValue";
import AnimatedIconButton from "~/buildingBlockComponents/animatedIconButton";
import { CgCloseO } from "react-icons/cg";

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
    <FlexFull className="h-[100svh] relative sm:p-1vh md:p-1.5vh bg-yellow-200/80 bg-radial4op25">
      <Transition className="w-full sm:p-1vh" type="fadeSlideInRight">
        <FlexFull className="bg-500-radial6op50 sm:border-900-md sm:shadowNarrowNormal h-full">
          <Box className="absolute top-1vh right-1vh sm:top-2vh sm:right-2vh">
            <AnimatedIconButton
              onClick={() => navigate("/movies")}
              text=""
              iconLeft={CloseIcon}
            />
          </Box>
          <FlexFull className="h-full overflow-y-auto border-900-md overflow-x-hidden insetShadowXxl">
            <VStackFull className="px-1vh py-2vh sm:p-3vh md:p-4vh lg:px-5vh xl:p-2vh">
              <FlexFull className="flex-col xl:flex-row xl:gap-2vh items-center justify-center">
                <ExpandableImage
                  src={movie.posterUrl || imageFallback}
                  caption={movie.title}
                />
                <VStackFull className="p-1vh">
                  <Text className="text-yellow-300 textShadow text-xl">
                    {movie.title || "I ain't go no movie!"}
                  </Text>

                  <VStackFull className="text-lg" gap="gap-2.5vh">
                    <FilmInfoLabelValue
                      label="Overview"
                      value={movie.summary}
                    />
                    <FilmInfoLabelValue label="Rating" value={movie.rating} />
                    <FilmInfoLabelValue
                      label="Duration"
                      value={
                        FormatDuration(movie.duration) ||
                        "No duration available."
                      }
                    />

                    {/* ********************** RELEASE DATE ********************** */}
                    <FilmInfoLabelValue
                      label="Release Date"
                      value={
                        FormatDate({
                          inputDate: movie.datePublished,
                          dateOnly: true,
                          format: "text",
                        }) || "No date available."
                      }
                    />

                    {/* ********************** GENRES ********************** */}
                    <FilmInfoWrap
                      heading="genres"
                      items={movie?.genres?.map((genre) => genre.title)}
                    />

                    {/* ********************** DIRECTORS ********************** */}
                    <FilmInfoWrap
                      heading="directors"
                      items={movie?.directors}
                    />

                    {/* ********************** WRITERS ********************** */}
                    <FilmInfoWrap heading="writers" items={movie?.writers} />

                    {/* ********************** ACTORS ********************** */}
                    <FilmInfoWrap
                      heading="main actors"
                      items={movie?.mainActors}
                    />
                  </VStackFull>
                </VStackFull>
              </FlexFull>
              <FlexFull className="py-1vh justify-center">
                <AnimatedIconButton
                  onClick={() => navigate("/movies")}
                  iconLeft={CloseIcon}
                  text="close"
                  iconRotation="group-hover:rotate-180"
                />
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
