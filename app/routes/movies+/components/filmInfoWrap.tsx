import { GiDramaMasks } from "react-icons/gi";
import AnimatedIconButton from "~/buildingBlockComponents/animatedIconButton";
import Box from "~/buildingBlockComponents/box";
import FlexFull from "~/buildingBlockComponents/flexFull";
import Text from "~/buildingBlockComponents/text";
import VStackFull from "~/buildingBlockComponents/vStackFull";
import Wrap from "~/buildingBlockComponents/wrap";

export default function FilmInfoWrap({
  heading,
  items,
  isGenres = false,
}: {
  heading: string;
  items: string[];
  isGenres?: boolean;
}) {
  return (
    <>
      {items && items.length > 0 ? (
        <FlexFull className="border-900-md shadowNarrowNormal rounded-[2vh]">
          <VStackFull className="px-1vh py-1vh bg-col-950 insetShadow5xl border-500-sm rounded-[2vh]">
            <h4 className="text-cyan-300 textShadow">{heading}</h4>

            <Wrap className="justify-evenly py-1vh gap-1.5vh ">
              {items.map((item, index) => (
                <>
                  {isGenres ? (
                    <AnimatedIconButton
                      text={item}
                      link={`/movies?genre=${item}`}
                      iconLeft={GiDramaMasks}
                      iconRotation="group-hover:-rotate-30"
                    />
                  ) : (
                    <Box
                      className="px-1.5vh py-0.1vh bg-700-linear6op25 border-500-sm shadowNarrowLooser rounded-[3vh]"
                      key={index}
                    >
                      <Text key={index}>{item}</Text>
                    </Box>
                  )}
                </>
              ))}
            </Wrap>
          </VStackFull>
        </FlexFull>
      ) : (
        <></>
      )}
    </>
  );
}
