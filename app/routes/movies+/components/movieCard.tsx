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
              ? ""
              : "pt-2.5vh md:pt-3.5vh xl:pt-5.5vh"
          }
        >
          <VStackFull>
            <Center className="w-95% border-970-md shadowNarrowLoose">
              <Image src={movie.posterUrl || imageFallback} alt={movie.title} />
            </Center>

            <Text>{movie.title}</Text>
            <Text>{movie.rating}</Text>
          </VStackFull>
        </Flex>
      </Flex>
    </AnimatedComponent>
  );
}
