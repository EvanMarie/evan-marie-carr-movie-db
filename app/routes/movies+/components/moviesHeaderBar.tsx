import { NavLink } from "@remix-run/react";
import AnimatedText from "~/buildingBlockComponents/animatedText";
import Box from "~/buildingBlockComponents/box";
import HStack from "~/buildingBlockComponents/hStack";
import HStackFull from "~/buildingBlockComponents/hStackFull";
import Image from "~/buildingBlockComponents/image";
import ScrollProgressBar from "~/buildingBlockComponents/scrollProgressBar";
import { Genre } from "../interfaces/genre";
import HoverMenu from "~/buildingBlockComponents/hoverMenu";
import { useState } from "react";
import Text from "~/buildingBlockComponents/text";

export default function MoviesHeaderBar({
  scrollRef,
  genres,
}: {
  scrollRef: React.RefObject<HTMLDivElement>;
  genres: Genre[];
}) {
  // Convert genres to an array of genre titles for the options menu
  const genreOptions = genres.map((genre) => genre.title);
  const [selectedGenre, setSelectedGenre] = useState("All Genres");
  console.log("genreOptions:", genreOptions);
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
            <AnimatedText text="Take Me to the Movies" isScale />
          </HStack>
        </NavLink>
        <HoverMenu mainText={selectedGenre}>
          {genreOptions.map((genre, index) => (
            <Text>{genre}</Text>
          ))}
        </HoverMenu>
        {/* <DropDownMenu
          buttonText={selectedGenre}
          options={genreOptions}
          selectedOption={selectedGenre}
          setSelectedOption={setSelectedGenre}
        /> */}
      </HStackFull>
      <ScrollProgressBar
        containerRef={scrollRef}
        position="absolute top-[5svh]"
        rounded="rounded-none"
      />
    </>
  );
}
