import { useEffect, useRef, useState } from "react";
import {
  ClientLoaderFunctionArgs,
  useLoaderData,
  useNavigate,
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

/* ************************ CLIENT LOADER ************************ */

export const clientLoader = async ({ request }: ClientLoaderFunctionArgs) => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || 1;
  const selectedGenre = url.searchParams.get("genre") || "";

  try {
    const movies = await fetchMovies(page, selectedGenre);
    const genres = await fetchGenres();
    return { movies, page, genres };
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
  const [currentPage, setCurrentPage] = useState(page);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedGenre, setSelectedGenre] = useState("All Genres");

  /* ************************ CURRENT PAGE  ************************ */
  useEffect(() => {
    setCurrentPage(page);
    selectedGenre !== "All Genres" &&
      navigate(`/movies?genre=${selectedGenre}`);
  }, [page, selectedGenre]);

  {
    /* ************************  SCROLL TO TOP ************************ */
  }
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage]);

  if (!movies || !Array.isArray(movies.data) || movies.data.length === 0) {
    return <p>No movies found.</p>;
  }

  {
    /* ************************ FIRST / LAST PAGE ************************ */
  }
  const nextPage =
    currentPage < movies.totalPages ? currentPage + 1 : currentPage;
  const prevPage = currentPage > 1 ? currentPage - 1 : currentPage;

  return (
    <VStackFull className="h-[100svh] overflow-hidden">
      <MoviesHeaderBar
        scrollRef={containerRef}
        genres={genres.data}
        setSelectedGenre={setSelectedGenre}
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
        currentPage={currentPage}
        prevPage={prevPage}
        nextPage={nextPage}
        totalPages={movies.totalPages}
        movies={movies}
      />
    </VStackFull>
  );
}
