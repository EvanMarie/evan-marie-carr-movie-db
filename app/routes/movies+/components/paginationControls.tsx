import {
  ArrowLeftIcon,
  ArrowRightIcon,
  DoubleLeftArrowIcon,
  DoubleRightArrowIcon,
} from "styles";
import AnimatedIconButton from "~/buildingBlockComponents/animatedIconButton";
import HStack from "~/buildingBlockComponents/hStack";
import HStackFull from "~/buildingBlockComponents/hStackFull";
import Text from "~/buildingBlockComponents/text";
import Tooltip from "~/buildingBlockComponents/tooltip";
import { MoviesResponse } from "../interfaces/movieResponse";
import Transition from "~/buildingBlockComponents/transition";

export default function PaginationControls({
  currentPage,
  prevPage,
  nextPage,
  totalPages,
  movies,
}: {
  currentPage: number;
  prevPage: number;
  nextPage: number;
  totalPages: number;
  movies: MoviesResponse;
}) {
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;
  return (
    <HStackFull className="justify-evenly h-5vh items-center absolute bottom-0 left-0 right-0 bg-col-880 bg-diagonal3op75 rounded-none">
      <Transition className="overflow-visible">
        <HStack className="pt-0.5vh" gap="gap-1.5vh md:gap-2.5vh">
          {/* ****************** FIRST PAGE ****************** */}

          <Tooltip
            label={!isFirstPage ? "first page" : undefined}
            placement="top"
          >
            <AnimatedIconButton
              link={`?page=1`} // Go to the first page
              text=""
              isDisabled={isFirstPage}
              iconLeft={DoubleLeftArrowIcon}
              iconRotation="group-hover:rotate-30"
            />
          </Tooltip>

          {/* ****************** PREVIOUS PAGE ****************** */}

          <Tooltip
            label={!isFirstPage ? "previous page" : undefined}
            placement="top"
          >
            <AnimatedIconButton
              link={`?page=${prevPage}`}
              isDisabled={isFirstPage}
              text=""
              iconLeft={ArrowLeftIcon}
              iconRotation="group-hover:rotate-30"
            />
          </Tooltip>
        </HStack>
      </Transition>

      {/* ****************** CURRENT PAGE ****************** */}
      <Text className="text-yellow-300 text-stroke-7-200 sm:text-md md:text-lg textShadow">
        Page {currentPage} of {totalPages}
      </Text>

      <Transition className="overflow-visible">
        <HStack className="pt-0.5vh" gap="gap-1.5vh md:gap-2.5vh">
          {/* ****************** NEXT PAGE ****************** */}
          <Tooltip
            label={!isLastPage ? "next page" : undefined}
            placement="top"
          >
            <AnimatedIconButton
              link={`?page=${nextPage}`}
              text=""
              isDisabled={isLastPage}
              iconRight={ArrowRightIcon}
              iconRotation="group-hover:-rotate-30"
            />
          </Tooltip>
          {/* ****************** LAST PAGE ****************** */}
          <Tooltip
            label={!isLastPage ? "last page" : undefined}
            placement="top"
          >
            <AnimatedIconButton
              link={`?page=${totalPages}`}
              isDisabled={isLastPage}
              text=""
              iconRight={DoubleRightArrowIcon}
              iconRotation="group-hover:-rotate-30"
            />
          </Tooltip>
        </HStack>
      </Transition>
    </HStackFull>
  );
}
