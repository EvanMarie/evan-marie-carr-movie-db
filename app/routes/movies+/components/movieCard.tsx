import Flex from "~/buildingBlockComponents/flex";
import { Movie } from "../interfaces/movie";
import VStackFull from "~/buildingBlockComponents/vStackFull";
import Text from "~/buildingBlockComponents/text";
import Image from "~/buildingBlockComponents/image";
import Box from "~/buildingBlockComponents/box";
import AnimatedComponent from "~/buildingBlockComponents/animateOnScroll";

export default function MovieCard({
  movie,
  index,
}: {
  movie: Movie;
  index: number;
}) {
  return (
    <AnimatedComponent>
      <Flex className="w-full sm:w-45vw md:w-30vw xl:w-20vw">
        <Flex className={index === 0 || index % 2 === 0 ? "" : "pt-5.5vh"}>
          <VStackFull>
            <Box className="w-full border-970-md shadowNarroTight">
              <Image src={movie.posterUrl} alt={movie.title} />
            </Box>
            <Text>{movie.title}</Text>
            <Text>{movie.rating}</Text>
          </VStackFull>
        </Flex>
      </Flex>
    </AnimatedComponent>
  );
}
