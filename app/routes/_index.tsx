import type { MetaFunction } from "@remix-run/node";
import { PiFilmReelBold } from "react-icons/pi";
import AnimatedIconButton from "~/buildingBlockComponents/animatedIconButton";
import FallingImages from "~/buildingBlockComponents/fallingImages";
import FlexFull from "~/buildingBlockComponents/flexFull";
import Text from "~/buildingBlockComponents/text";
import Transition from "~/buildingBlockComponents/transition";
import VStack from "~/buildingBlockComponents/vStack";
import VStackFull from "~/buildingBlockComponents/vStackFull";
import Wrap from "~/buildingBlockComponents/wrap";

export const meta: MetaFunction = () => {
  return [
    { title: "Take Me to the Movies" },
    {
      name: "A lovely little movie database",
      content: "Take Me to the Movies!",
    },
  ];
};

export default function Index() {
  return (
    <FlexFull className="justify-center items-center h-[100svh] bg-col-450 bg-radial4op50 rounded-none">
      <FallingImages />
      <Transition className="absolute inset-0 w-full h-full justify-center items-center rounded-none insetShadow5xl">
        <VStackFull
          className="text-center xxl:w-[60vw]"
          gap="gap-3vh lg:gap-5vh"
        >
          <VStack gap="gap-0.5vh md:gap-1vh lg:gap-2vh">
            <Text className="blockLetters textShineLg text-col-900 text-stroke-10-900 text-6vh md:text-8vh lg:text-10vh text-center animate-slideInRight">
              Take Me To
            </Text>
            <Text className="blockLetters textShineLg text-col-900 text-stroke-10-900 text-6vh md:text-[8vh] lg:text-[10vh] text-center animate-slideInLeft">
              the Movies
            </Text>
          </VStack>

          <Wrap className="animate-slideInUp50vh gap-[3vh] duration-2200 justify-center">
            <AnimatedIconButton
              text="Walk me in!"
              link="/movies"
              iconLeft={PiFilmReelBold}
            />
          </Wrap>
        </VStackFull>
      </Transition>
    </FlexFull>
  );
}
