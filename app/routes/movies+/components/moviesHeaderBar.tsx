import { NavLink } from "@remix-run/react";
import AnimatedText from "~/buildingBlockComponents/animatedText";
import Box from "~/buildingBlockComponents/box";
import HStack from "~/buildingBlockComponents/hStack";
import HStackFull from "~/buildingBlockComponents/hStackFull";
import Image from "~/buildingBlockComponents/image";
import ScrollProgressBar from "~/buildingBlockComponents/scrollProgressBar";

export default function MoviesHeaderBar({
  scrollRef,
}: {
  scrollRef: React.RefObject<HTMLDivElement>;
}) {
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
      </HStackFull>
      <ScrollProgressBar
        containerRef={scrollRef}
        position="absolute top-[5svh]"
        rounded="rounded-none"
      />
    </>
  );
}
