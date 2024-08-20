import {
  ClientLoaderFunctionArgs,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "@remix-run/react";
import { fetchMovieById } from "~/utils/movies-api";
import { MovieById } from "./interfaces/movieById";
import FlexFull from "~/buildingBlockComponents/flexFull";
import VStackFull from "~/buildingBlockComponents/vStackFull";
import Box from "~/buildingBlockComponents/box";
import { CloseIcon, imageFallback } from "styles";
import { ExpandableImage } from "~/buildingBlockComponents/expandableImage";
import Transition from "~/buildingBlockComponents/transition";
import Text from "~/buildingBlockComponents/text";
import FormatDate from "~/utils/formatDate";
import FilmInfoWrap from "./components/filmInfoWrap";
import FormatDuration from "~/utils/formatDuration";
import FilmInfoLabelValue from "./components/filmInfoLabelValue";
import AnimatedIconButton from "~/buildingBlockComponents/animatedIconButton";

export const clientLoader = async ({ params }: ClientLoaderFunctionArgs) => {
  const { id: movieId } = params;
  const movie = await fetchMovieById(movieId!);
  return movie;
};
clientLoader.hydrate = true;

export default function ViewMovie() {
  const movie = useLoaderData<MovieById>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from") || "";

  return (
    <FlexFull className="h-[100svh] relative lg:p-1.5vh bg-yellow-200/80 bg-radial4op25 rounded-none lg:rounded-[1vh]">
      <Transition
        className="w-full  rounded-none lg:rounded-[1vh]"
        type="fadeSlideInRight"
      >
        <FlexFull className="bg-500-radial6op50 sm:border-900-md sm:shadowNarrowNormal h-full rounded-none lg:rounded-[1vh]">
          <Box className="absolute top-1vh right-1vh sm:top-2vh sm:right-2vh">
            <AnimatedIconButton
              onClick={() => navigate(from || "/movies")}
              text=""
              iconLeft={CloseIcon}
            />
          </Box>
          <FlexFull className="h-full overflow-y-auto border-900-md overflow-x-hidden insetShadowXxl">
            <VStackFull className="px-1vh py-2vh sm:p-3vh md:p-4vh lg:px-5vh xl:p-1.5vh xxl:px-2vh">
              <FlexFull className="flex-col xl:flex-row xl:gap-2vh items-center xl:items-center justify-start xl:justify-center h-full">
                <ExpandableImage
                  src={movie.posterUrl || imageFallback}
                  caption={movie.title}
                />
                <VStackFull className="p-1vh h-full justify-between">
                  <Text className="text-yellow-300 textShadow text-xl">
                    {movie.title || "I ain't go no movie!"}
                  </Text>

                  <VStackFull className="text-lg" gap="gap-2vh">
                    {/* ********************* FILM MAIN DETAILS ********************* */}
                    <VStackFull>
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
                    </VStackFull>
                    <VStackFull gap="gap-2vh">
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
                  <FlexFull className="pb-1vh pt-3vh justify-center">
                    <AnimatedIconButton
                      onClick={() => navigate(from || "/movies")}
                      iconLeft={CloseIcon}
                      text="close"
                      iconRotation="group-hover:rotate-180"
                    />
                  </FlexFull>
                </VStackFull>
              </FlexFull>
            </VStackFull>
          </FlexFull>
        </FlexFull>
      </Transition>
    </FlexFull>
  );
}
