import { useEffect, useRef, useState } from "react";
import {
  ClientLoaderFunctionArgs,
  json,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "@remix-run/react";
import VStackFull from "~/buildingBlockComponents/vStackFull";
import Wrap from "~/buildingBlockComponents/wrap";
import MovieCard from "./components/movieCard";
import { BASE_URL, fetchGenres, fetchMovies } from "~/utils/movies-api";
import { MoviesResponse } from "./interfaces/movieResponse";
import FlexFull from "~/buildingBlockComponents/flexFull";
import PaginationControls from "./components/paginationControls";
import MoviesHeaderBar from "./components/moviesHeaderBar";
import { GenreResponse } from "./interfaces/genre";
import Center from "~/buildingBlockComponents/center";
import VStack from "~/buildingBlockComponents/vStack";
import AnimatedIconButton from "~/buildingBlockComponents/animatedIconButton";
import { TiArrowBackOutline } from "react-icons/ti";
import HStack from "~/buildingBlockComponents/hStack";
import { PiSmileyXEyesLight } from "react-icons/pi";

/* ************************ CLIENT LOADER ************************ */

export const clientLoader = async ({ request }: ClientLoaderFunctionArgs) => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || 1;
  const selectedGenre = url.searchParams.get("genre") || "";

  try {
    const movies = await fetchMovies(page, selectedGenre);
    const genres = await fetchGenres();
    return json(
      { movies, page, genres },
      { headers: { "Cache-Control": "max-age=300" } }
    );
  } catch (error) {
    console.error("Loader error:", error);
    throw new Response("Failed to load movies", { status: 500 });
  }
};
clientLoader.hydrate = true;

/* ************************ INDEX COMPONENT  ************************ */

export default function Index() {
  const { movies, page, genres } = useLoaderData<{
    movies: MoviesResponse;
    page: number;
    genres: GenreResponse;
  }>();

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(searchParams.get("page") || 1);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedGenre, setSelectedGenre] = useState(
    searchParams.get("genre") || ""
  );

  /* ************************ MONITOR TOTAL RESULTS  ************************ */
  const numAllMoviesAllGenres = genres.data.reduce(
    (acc, genre) => acc + genre.movies.length,
    0
  );
  const numResults =
    selectedGenre === ""
      ? numAllMoviesAllGenres
      : genres.data.find((genre) => genre.title === selectedGenre)?.movies
          .length;

  const state = { genre: selectedGenre, page: String(currentPage) };

  /* ************************ CURRENT PAGE & GENRE STATE ************************ */

  useEffect(() => {
    setSearchParams(state);
  }, [selectedGenre, currentPage]);

  {
    /* ************************  SCROLL TO TOP ************************ */
  }
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage]);

  /* ************************  NO MOVIES FOUND ************************ */
  if (!movies || !Array.isArray(movies.data) || movies.data.length === 0) {
    return (
      <Center className="h-[100svh] w-full">
        <VStack gap="gap-5vh">
          <h2 className="blockLetters text-yellow-300 textFogXs">
            Oh, Snippity SNAPS!
          </h2>
          <h2 className="blockLetters text-yellow-300 textFogXs">
            No Movies Found
          </h2>
          <AnimatedIconButton
            iconRotation="group-hover:-rotate-30"
            iconLeft={TiArrowBackOutline}
            text="Back to Movies"
            link="/movies"
          />{" "}
        </VStack>
      </Center>
    );
  }

  {
    /* ************************ FIRST / LAST PAGE ************************ */
  }
  const nextPage =
    Number(currentPage) < movies.totalPages
      ? Number(currentPage) + 1
      : currentPage;
  const prevPage =
    Number(currentPage) > 1 ? Number(currentPage) - 1 : currentPage;

  return (
    /* ************************ HEADER COMPONENT ************************ */
    <VStackFull className="h-[100svh] overflow-hidden">
      <MoviesHeaderBar
        scrollRef={containerRef}
        genres={genres.data}
        setSelectedGenre={setSelectedGenre}
        setCurrentPage={setCurrentPage}
      />

      {/* ****************** MOVIE CARDS ****************** */}
      <FlexFull
        className="h-[100svh] py-[5.5svh] overflow-y-auto overflow-x-hidden hide-scrollbar"
        ref={containerRef}
      >
        <Wrap className="justify-evenly gap-1vh md:gap-2vh py-1.5vh h-fit">
          {movies.data.map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} index={index} />
          ))}
        </Wrap>
      </FlexFull>

      {/* ****************** PAGINATION FOOTER ****************** */}
      <PaginationControls
        onFirstPage={() => setCurrentPage(1)}
        onPreviousPage={() => setCurrentPage(prevPage)}
        onNextPage={() => setCurrentPage(nextPage)}
        onLastPage={() => setCurrentPage(movies.totalPages)}
        currentPage={Number(currentPage)}
        prevPage={Number(prevPage)}
        nextPage={Number(nextPage)}
        totalPages={movies.totalPages}
        numResults={numResults || 0}
      />
    </VStackFull>
  );
}
