import { useState } from "react";
import Flex from "~/buildingBlockComponents/flex";
import VStackFull from "~/buildingBlockComponents/vStackFull";
import Text from "~/buildingBlockComponents/text";
import Image from "~/buildingBlockComponents/image";
import Center from "~/buildingBlockComponents/center";
import AnimatedComponent from "~/buildingBlockComponents/animateOnScroll";
import { imageFallback } from "styles";
import FlexFull from "~/buildingBlockComponents/flexFull";
import BouncingDots from "~/buildingBlockComponents/bouncingDots";
import { Movie } from "../interfaces/movie";
import Transition from "~/buildingBlockComponents/transition";

export default function MovieCard({
  movie,
  index,
}: {
  movie: Movie;
  index: number;
}) {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <AnimatedComponent>
      <Transition>
        <Flex className="w-85vw sm:w-45vw md:w-30vw xl:w-20vw">
          <FlexFull
            className={
              index === 0 || index % 2 === 0
                ? "pt-1.5vh"
                : "pt-1.5vh sm:pt-3.5vh md:pt-4.5vh xl:pt-5.5vh"
            }
          >
            <VStackFull className="hover:cursor-pointer">
              <Center className="w-95% border-980-md hover:border-280-md transition-300 shadowNarrowLoose rounded-[1.6vh] ">
                {isLoading && (
                  <Center className="skeleton w-full h-full rounded-[1.5vh] text-transparent min-h-[40vh] bg-radial4 animate-pulse duration-500">
                    <BouncingDots />
                  </Center>
                )}
                <Image
                  src={movie.posterUrl || imageFallback}
                  alt={movie.title}
                  className={`w-full h-full rounded-[1.5vh] ${
                    isLoading ? "hidden" : ""
                  }`}
                  onLoad={handleImageLoad}
                />
              </Center>
              <Text className="text-2vh text-yellow-300 text-stroke-5-200 textShadow text-center">
                {movie.title}
              </Text>
            </VStackFull>
          </FlexFull>
        </Flex>
      </Transition>
    </AnimatedComponent>
  );
}
