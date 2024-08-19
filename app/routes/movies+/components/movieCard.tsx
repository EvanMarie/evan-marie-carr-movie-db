import Flex from "~/buildingBlockComponents/flex";
import { Movie } from "../interfaces/movie";
import VStackFull from "~/buildingBlockComponents/vStackFull";
import Text from "~/buildingBlockComponents/text";
import Image from "~/buildingBlockComponents/image";
import AnimatedComponent from "~/buildingBlockComponents/animateOnScroll";
import Center from "~/buildingBlockComponents/center";
import { imageFallback } from "styles";

export default function MovieCard({
  movie,
  index,
}: {
  movie: Movie;
  index: number;
}) {
  return (
    <AnimatedComponent>
      <Flex className="w-90vw sm:w-45vw md:w-30vw xl:w-20vw">
        <Flex
          className={
            index === 0 || index % 2 === 0
              ? "pt-1.5vh"
              : "pt-1.5vh sm:pt-2.5vh md:pt-3.5vh xl:pt-5.5vh"
          }
        >
          <VStackFull>
            <Center className="w-95% border-970-md shadowNarrowLoose">
              <Image
                src={movie.posterUrl || imageFallback}
                alt={movie.title}
                className="w-full h-full"
              />
            </Center>
            <Text className="text-2vh text-yellow-300 text-stroke-5-200 textShadow text-center">
              {movie.title}
            </Text>
          </VStackFull>
        </Flex>
      </Flex>
    </AnimatedComponent>
  );
}
