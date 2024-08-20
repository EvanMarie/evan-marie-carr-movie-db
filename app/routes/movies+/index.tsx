import { useEffect, useRef, useState } from "react";
import { ClientLoaderFunctionArgs, useLoaderData } from "@remix-run/react";
import VStackFull from "~/buildingBlockComponents/vStackFull";
import Wrap from "~/buildingBlockComponents/wrap";
import MovieCard from "./components/movieCard";
import { fetchMovies } from "~/utils/movies-api";
import { MoviesResponse } from "./interfaces/movieResponse";
import FlexFull from "~/buildingBlockComponents/flexFull";
import PaginationControls from "./components/paginationControls";
import MoviesHeaderBar from "./components/moviesHeaderBar";


/* ************************ CLIENT LOADER ************************ */

export const clientLoader = async ({ request }: ClientLoaderFunctionArgs) => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || 1;
  const genre = url.searchParams.get("genre") || "";

  try {
    const movies = await fetchMovies(page, genre);
    return { movies, page };
  } catch (error) {
    console.error("Loader error:", error);
    throw new Response("Failed to load movies", { status: 500 });
  }
};
clientLoader.hydrate = true;

export default function Index() {
  const { movies, page } = useLoaderData<{
    movies: MoviesResponse;
    page: number;
  }>();
  const [currentPage, setCurrentPage] = useState(page);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  {
    /* *********  Scroll to top when the current page changes ********* */
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
    /* ****************** First and Last Page Definitions ****************** */
  }
  const nextPage =
    currentPage < movies.totalPages ? currentPage + 1 : currentPage;
  const prevPage = currentPage > 1 ? currentPage - 1 : currentPage;

  return (
    <VStackFull className="h-[100svh] overflow-hidden">
      <MoviesHeaderBar scrollRef={containerRef} />

      {/* ****************** Movie Images ****************** */}
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

      {/* ****************** Pagination controls ****************** */}
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
