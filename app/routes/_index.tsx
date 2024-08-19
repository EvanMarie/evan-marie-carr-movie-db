import type { MetaFunction } from "@remix-run/node";
import { PiFilmReelBold } from "react-icons/pi";
import AnimatedIconButton from "~/buildingBlockComponents/animatedIconButton";
import FallingImages from "~/buildingBlockComponents/fallingImages";
import FlexFull from "~/buildingBlockComponents/flexFull";
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
    <FlexFull className="justify-center items-center h-[100svh] bg-col-450 bg-radial4op50 rounded-none">
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
            <AnimatedIconButton
              text="Walk me in!"
              link="/movies"
              icon={PiFilmReelBold}
            />
          </Wrap>
        </VStackFull>
      </Transition>
    </FlexFull>
  );
}
