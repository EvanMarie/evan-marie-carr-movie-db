import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState, useEffect, useRef } from "react";
import HStack from "~/buildingBlockComponents/hStack";
import NavButton from "~/buildingBlockComponents/navLinkButton";
import Text from "~/buildingBlockComponents/text";
import { fetchMovies } from "~/utils/movies-api";
import { MoviesResponse } from "./interfaces/movieResponse";
import FlexFull from "~/buildingBlockComponents/flexFull";
import Wrap from "~/buildingBlockComponents/wrap";
import MovieCard from "./components/movieCard";
import VStackFull from "~/buildingBlockComponents/vStackFull";
import HStackFull from "~/buildingBlockComponents/hStackFull";
import ScrollProgressBar from "~/buildingBlockComponents/scrollProgressBar";

export const loader: LoaderFunction = async ({ request }) => {
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

export default function Index() {
  const { movies, page } = useLoaderData<{
    movies: MoviesResponse;
    page: number;
  }>();
  const [currentPage, setCurrentPage] = useState(page);
  console.log(movies);
  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  if (!movies || !Array.isArray(movies.data) || movies.data.length === 0) {
    return <p>No movies found.</p>;
  }
  const containerRef = useRef<HTMLDivElement | null>(null);
  const nextPage =
    currentPage < movies.totalPages ? currentPage + 1 : currentPage;
  const prevPage = currentPage > 1 ? currentPage - 1 : currentPage;

  return (
    <VStackFull>
      <HStackFull className="fixed inset-0 h-[5svh] justify-between items-center bg-col-780 bg-radial5op75 rounded-none z-50">
        <h3>Movies</h3>
      </HStackFull>
      <ScrollProgressBar
        containerRef={containerRef}
        position="absolute top-[5svh]"
      />
      <VStackFull
        className="h-[100svh] pt-[5.5svh] overflow-y-auto overflow-x-hidden"
        ref={containerRef}
      >
        <VStackFull className="py-2vh">
          <FlexFull className="xl:max-w-90%">
            <Wrap className="justify-evenly gap-1vh md:gap-2vh">
              {movies.data.map((movie, index) => (
                <MovieCard key={movie.id} movie={movie} index={index} />
              ))}
            </Wrap>
          </FlexFull>
          {/* ****************** Pagination controls ****************** */}
          <div>
            <HStack>
              <NavButton
                to={`?page=${prevPage}`}
                isDisabled={currentPage <= 1}
                buttonText="Previous"
              />
              <Text>
                Page {currentPage} of {movies.totalPages}
              </Text>
              <NavButton
                to={`?page=${nextPage}`}
                isDisabled={currentPage >= movies.totalPages}
                buttonText="Next"
              />
            </HStack>
          </div>
        </VStackFull>
      </VStackFull>
    </VStackFull>
  );
}
