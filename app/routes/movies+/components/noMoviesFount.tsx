import { TiArrowBackOutline } from "react-icons/ti";
import AnimatedIconButton from "~/buildingBlockComponents/animatedIconButton";
import Center from "~/buildingBlockComponents/center";
import Image from "~/buildingBlockComponents/image";
import Transition from "~/buildingBlockComponents/transition";
import VStack from "~/buildingBlockComponents/vStack";

export default function NoMoviesFound({
  setSearchQuery,
}: {
  setSearchQuery: (query: string) => void;
}) {
  return (
    <Transition>
      <Center className="h-[100svh] w-100vw">
        <VStack gap="gap-5vh">
          <Image
            src="/images/movie-reel-yellow.webp"
            alt="Movie Reel"
            className="w-20vh rounded-full"
          />
          <h2 className="blockLetters text-yellow-300 textFogXs">
            Oh, Snippity SNAPS!
          </h2>
          <h2 className="blockLetters text-yellow-300 textFogXs">
            No Movies Found
          </h2>
          <AnimatedIconButton
            iconRotation="group-hover:-rotate-30"
            iconLeft={TiArrowBackOutline}
            text="Let's Try This Again"
            onClick={() => setSearchQuery("")}
          />{" "}
        </VStack>
      </Center>
    </Transition>
  );
}
