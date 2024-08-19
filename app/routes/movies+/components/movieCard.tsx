import Flex from "~/buildingBlockComponents/flex";
import { Movie } from "../interfaces/movie";
import VStackFull from "~/buildingBlockComponents/vStackFull";
import Text from "~/buildingBlockComponents/text";
import Image from "~/buildingBlockComponents/image";

export default function MovieCard({
  movie,
  index,
}: {
  movie: Movie;
  index: number;
}) {
  return (
    <Flex className="w-full sm:w-45% md:w-30% lg:w-23%">
      <Flex className={index === 0 || index % 2 === 0 ? "" : "pt-5.5vh"}>
        <VStackFull>
          <Image src={movie.posterUrl} alt={movie.title} />
          <Text>{movie.title}</Text>
          <Text>{movie.rating}</Text>
        </VStackFull>
      </Flex>
    </Flex>
  );
}
