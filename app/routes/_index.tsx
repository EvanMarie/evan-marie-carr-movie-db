import type { MetaFunction } from "@remix-run/node";
import { NavLink } from "@remix-run/react";
import { MdLocalMovies } from "react-icons/md";
import Box from "~/buildingBlockComponents/box";
import FallingImages from "~/buildingBlockComponents/fallingImages";
import FlexFull from "~/buildingBlockComponents/flexFull";
import HStack from "~/buildingBlockComponents/hStack";
import Icon from "~/buildingBlockComponents/icon";
import Image from "~/buildingBlockComponents/image";
import NavButton from "~/buildingBlockComponents/navLinkButton";
import Text from "~/buildingBlockComponents/text";
import Transition from "~/buildingBlockComponents/transition";
import VStackFull from "~/buildingBlockComponents/vStackFull";
import Wrap from "~/buildingBlockComponents/wrap";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <FlexFull className="justify-center items-center h-[100svh] bg-col-750 bg-radial4op75">
      {/* <Box className="w-90% sm:w-80% md:w-70% lg:w-60% xl:w-50% xxl:w-40% pr-1.5vh animate-slideInDown">
        <Image
          src="/images/movie-reel-yellow.webp"
          alt="movie reel image"
          className="opacity-40"
        />
      </Box> */}
      <FallingImages />
      <Transition className="absolute inset-0 w-full h-full justify-center items-center">
        <VStackFull className="text-center xxl:w-[60vw]" gap="gap-[4vh]">
          <Text className="font-cursive boldTextGlow text-col-900 text-stroke-8-900 text-[4.5vh] md:text-[8vh] lg:text-[10vh] text-center animate-slideInRight">
            Let's Go To
          </Text>
          <Text className="font-cursive boldTextGlow text-col-900 text-stroke-8-900 text-[4.5vh] md:text-[8vh] lg:text-[10vh] text-center animate-slideInLeft">
            the Movies
          </Text>

          <Wrap className="animate-slideInUp50vh gap-[3vh] duration-2200 justify-center">
            <NavButton
              buttonText="Yes! Let's go!"
              to="/movies"
              iconLeft={MdLocalMovies}
            />
          </Wrap>
        </VStackFull>
      </Transition>
    </FlexFull>
  );
}
