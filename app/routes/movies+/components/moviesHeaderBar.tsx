import { NavLink, useParams, useSearchParams } from "@remix-run/react";
import AnimatedText from "~/buildingBlockComponents/animatedText";
import Box from "~/buildingBlockComponents/box";
import HStack from "~/buildingBlockComponents/hStack";
import HStackFull from "~/buildingBlockComponents/hStackFull";
import Image from "~/buildingBlockComponents/image";
import ScrollProgressBar from "~/buildingBlockComponents/scrollProgressBar";
import { Genre } from "../interfaces/genre";
import HoverMenu from "~/buildingBlockComponents/hoverMenu";
import { motion } from "framer-motion";

export default function MoviesHeaderBar({
  scrollRef,
  genres,
  setSelectedGenre,
  setCurrentPage,
}: {
  scrollRef: React.RefObject<HTMLDivElement>;
  genres: Genre[];
  setSelectedGenre: (genre: string) => void;
  setCurrentPage: (page: number) => void;
}) {
  const [searchParams] = useSearchParams();
  const selectedGenre = searchParams.get("genre") || "All Genres";
  // Convert genres to an array of genre titles for the options menu
  const genreOptions = genres.map((genre) => genre.title);
  genreOptions.unshift("All Genres");

  const genresWithoutSelected = genreOptions.filter(
    (genre) => genre !== selectedGenre
  );

  return (
    <>
      <HStackFull className="fixed inset-0 h-[5svh] justify-between items-center bg-col-880 bg-diagonal3op75 rounded-none z-50 px-1vh">
        <NavLink to="/">
          <HStack
            className="items-center hover:cursor-pointer"
            gap="gap-1vh sm:gap-1.5vh"
          >
            <Box className="rounded-full border-900-md shadowNarrowLooser hover:cursor-pointer">
              <Image
                src="/images/movie-reel-yellow.webp"
                alt="Movie Reel"
                className="h-3.5vh"
              />
            </Box>
            <AnimatedText
              text="Take Me to the Movies"
              isScale
              containerClassName="hidden sm:flex"
            />
            <AnimatedText
              text="TMttM"
              isScale
              containerClassName="flex sm:hidden"
            />
          </HStack>
        </NavLink>
        <HoverMenu mainText={selectedGenre || "All Genres"} className="w-20vh">
          {genresWithoutSelected.map((genre, index) => (
            <motion.button
              key={index}
              className="w-full px-1vh py-0.5vh text-sm md:text-md text-left hover:bg-col-150"
              onClick={() => {
                setCurrentPage(1);
                genre === "All Genres"
                  ? setSelectedGenre("")
                  : setSelectedGenre(genre);
              }}
            >
              {genre}
            </motion.button>
          ))}
        </HoverMenu>
      </HStackFull>
      <ScrollProgressBar
        containerRef={scrollRef}
        position="absolute top-[5svh]"
        rounded="rounded-none"
      />
    </>
  );
}
