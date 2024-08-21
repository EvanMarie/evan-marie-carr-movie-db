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
import Transition from "~/buildingBlockComponents/transition";

export default function PaginationControls({
  currentPage,
  totalPages,
  numResults,
  onFirstPage,
  onPreviousPage,
  onNextPage,
  onLastPage,
}: {
  currentPage: number;
  totalPages: number;
  numResults: number;
  onFirstPage: () => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onLastPage: () => void;
}) {
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;
  const textStyles =
    "text-sm sm:text-md md:text-lg text-yellow-300 text-stroke-7-200 textShadow";
  return (
    <HStackFull className="justify-between md:justify-evenly h-5vh items-center absolute bottom-0 left-0 right-0 bg-col-880 bg-diagonal3op75 rounded-none px-1vh">
      <Transition className="overflow-visible">
        <HStack className="pt-0.5vh" gap="gap-1.5vh md:gap-2.5vh">
          {/* ****************** FIRST PAGE ****************** */}

          <Tooltip
            label={!isFirstPage ? "first page" : undefined}
            placement="top"
          >
            <AnimatedIconButton
              onClick={onFirstPage}
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
              onClick={onPreviousPage}
              isDisabled={isFirstPage}
              text=""
              iconLeft={ArrowLeftIcon}
              iconRotation="group-hover:rotate-30"
            />
          </Tooltip>
        </HStack>
      </Transition>

      {/* ****************** NUM RESULTS & CURRENT PAGE ****************** */}

      {numResults > 0 && (
        <Text className={textStyles}>Results: {numResults}</Text>
      )}
      {numResults > 0 && (
        <Text className={textStyles}>
          Page {currentPage} of {totalPages}
        </Text>
      )}
      {numResults === 0 && <Text className={textStyles}>No Results Found</Text>}

      <Transition className="overflow-visible">
        <HStack className="pt-0.5vh" gap="gap-1.5vh md:gap-2.5vh">
          {/* ****************** NEXT PAGE ****************** */}
          <Tooltip
            label={!isLastPage ? "next page" : undefined}
            placement="top"
          >
            <AnimatedIconButton
              onClick={onNextPage}
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
              onClick={onLastPage}
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
