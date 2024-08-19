import { useEffect, useRef, useState } from "react";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import HStackFull from "~/buildingBlockComponents/hStackFull";
import VStackFull from "~/buildingBlockComponents/vStackFull";
import ScrollProgressBar from "~/buildingBlockComponents/scrollProgressBar";
import AnimatedIconButton from "~/buildingBlockComponents/animatedIconButton";
import Text from "~/buildingBlockComponents/text";
import Wrap from "~/buildingBlockComponents/wrap";
import MovieCard from "./components/movieCard";
import { fetchMovies } from "~/utils/movies-api";
import { MoviesResponse } from "./interfaces/movieResponse";
import { ArrowLeftIcon, ArrowRightIcon } from "styles";
import FlexFull from "~/buildingBlockComponents/flexFull";

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
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  // Scroll to top when the current page changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage]);

  if (!movies || !Array.isArray(movies.data) || movies.data.length === 0) {
    return <p>No movies found.</p>;
  }

  const nextPage =
    currentPage < movies.totalPages ? currentPage + 1 : currentPage;
  const prevPage = currentPage > 1 ? currentPage - 1 : currentPage;

  return (
    <VStackFull className="h-[100svh] overflow-hidden">
      <HStackFull className="fixed inset-0 h-[5svh] justify-between items-center bg-col-880 bg-radial5op75 rounded-none z-50">
        <h4>Movies</h4>
      </HStackFull>
      <ScrollProgressBar
        containerRef={containerRef}
        position="absolute top-[5svh]"
      />

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
      <HStackFull className="justify-evenly h-4.5vh items-center absolute bottom-0 left-0 right-0 bg-col-880 bg-radial5op75 rounded-none pt-0.5vh">
        <AnimatedIconButton
          link={`?page=${prevPage}`}
          isDisabled={currentPage <= 1}
          text="Previous"
          icon={ArrowLeftIcon}
          buttonSize="small"
        />
        <Text>
          Page {currentPage} of {movies.totalPages}
        </Text>
        <AnimatedIconButton
          link={`?page=${nextPage}`}
          isDisabled={currentPage >= movies.totalPages}
          text="Next"
          icon={ArrowRightIcon}
          buttonSize="small"
        />
      </HStackFull>
    </VStackFull>
  );
}
