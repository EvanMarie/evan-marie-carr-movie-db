import { useEffect, useRef, useState } from "react";
import {
  ClientLoaderFunctionArgs,
  json,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";
import VStackFull from "~/buildingBlockComponents/vStackFull";
import Wrap from "~/buildingBlockComponents/wrap";
import MovieCard from "./components/movieCard";
import { fetchGenres, fetchMovies } from "~/utils/movies-api";
import { MoviesResponse } from "./interfaces/movieResponse";
import FlexFull from "~/buildingBlockComponents/flexFull";
import PaginationControls from "./components/paginationControls";
import MoviesHeaderBar from "./components/moviesHeaderBar";
import { Genre, GenreResponse } from "./interfaces/genre";
import Center from "~/buildingBlockComponents/center";
import VStack from "~/buildingBlockComponents/vStack";
import AnimatedIconButton from "~/buildingBlockComponents/animatedIconButton";
import { TiArrowBackOutline } from "react-icons/ti";
import Transition from "~/buildingBlockComponents/transition";
import Image from "~/buildingBlockComponents/image";

/* ************************ CLIENT LOADER ************************ */

export const clientLoader = async ({ request }: ClientLoaderFunctionArgs) => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || 1;
  const selectedGenre = url.searchParams.get("genre") || "";
  const searchQuery = url.searchParams.get("search") || "";

  try {
    const movies = await fetchMovies(page, selectedGenre, searchQuery);
    const genres = await fetchGenres();

    return json(
      { movies, genres },
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
  /* ************************ LOADER DATA ************************ */
  const { movies, genres } = useLoaderData<{
    movies: MoviesResponse;
    page: number;
    genres: GenreResponse;
    genreInfo: Genre;
  }>();

  /* ************************ NAVIGATE & SEARCH PARAMS ************************ */
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(searchParams.get("page") || 1);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedGenre, setSelectedGenre] = useState(
    searchParams.get("genre") || ""
  );
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );

  /* ************************ MONITOR TOTAL RESULTS  ************************ */
  const numAllMoviesAllGenres = genres.data.reduce(
    (acc, genre) => acc + genre.movies.length,
    0
  );

  console.log("MOVIES:", movies);
  const numResults =
    searchQuery !== ""
      ? movies.data.length
      : selectedGenre === ""
      ? numAllMoviesAllGenres
      : genres.data.find((genre) => genre.title === selectedGenre)?.movies
          .length;

  const state = {
    genre: selectedGenre,
    page: String(currentPage),
    search: searchQuery,
  };

  /* ************************* CURRENT PAGE & GENRE STATE ************************* */

  useEffect(() => {
    setSearchParams(state);
  }, [selectedGenre, currentPage, searchQuery]);

  {
    /* *************************  SCROLL TO TOP ************************* */
  }
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage]);

  {
    /* ************************* FIRST / LAST PAGE ************************* */
  }
  const nextPage =
    Number(currentPage) < movies.totalPages
      ? Number(currentPage) + 1
      : currentPage;
  const prevPage =
    Number(currentPage) > 1 ? Number(currentPage) - 1 : currentPage;

  return (
    /* ************************* HEADER COMPONENT ************************* */
    <VStackFull className="h-[100svh] overflow-hidden">
      <MoviesHeaderBar
        scrollRef={containerRef}
        genres={genres.data}
        setSelectedGenre={setSelectedGenre}
        setCurrentPage={setCurrentPage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* ************************* NO MOVIES FOUND ************************* */}
      {!movies || !Array.isArray(movies.data) || movies.data.length === 0 ? (
        <Transition>
          <Center className="h-[100svh] w-100vw">
            <VStack gap="gap-5vh">
              <Image
                src="/images/movie-reel-yellow.webp"
                alt="Movie Reel"
                className="w-20vh rounded-full"
              />
              <h2 className="blockLetters text-yellow-300 textFogXs">
                Oh, Snippity SNAPS!
              </h2>
              <h2 className="blockLetters text-yellow-300 textFogXs">
                No Movies Found
              </h2>
              <AnimatedIconButton
                iconRotation="group-hover:-rotate-30"
                iconLeft={TiArrowBackOutline}
                text="Let's Try This Again"
                onClick={() => setSearchQuery("")}
              />{" "}
            </VStack>
          </Center>
        </Transition>
      ) : (
        <FlexFull
          className="h-[100svh] py-[5.5svh] overflow-y-auto overflow-x-hidden hide-scrollbar"
          ref={containerRef}
        >
          <VStackFull>
            {selectedGenre && (
              <FlexFull className="justify-center py-1vh">
                <h2 className="blockLetters text-yellow-300 textFogXs">
                  {selectedGenre}
                </h2>
              </FlexFull>
            )}
            {/* ************************* MOVIE CARDS ************************* */}
            <Wrap className="justify-evenly gap-1vh md:gap-2vh py-1.5vh h-fit">
              {movies.data.map((movie, index) => (
                <MovieCard key={movie.id} movie={movie} index={index} />
              ))}
            </Wrap>{" "}
          </VStackFull>
        </FlexFull>
      )}
      {/* ************************* PAGINATION FOOTER ************************* */}
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
