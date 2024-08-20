import Box from "~/buildingBlockComponents/box";
import FlexFull from "~/buildingBlockComponents/flexFull";
import Text from "~/buildingBlockComponents/text";
import VStackFull from "~/buildingBlockComponents/vStackFull";
import Wrap from "~/buildingBlockComponents/wrap";

export default function FilmInfoWrap({
  heading,
  items,
}: {
  heading: string;
  items: string[];
}) {
  return (
    <>
      {items && items.length > 0 ? (
        <FlexFull className="border-900-md shadowNarrowNormal rounded-[2vh]">
          <VStackFull className="px-1vh py-1.5vh bg-col-950 insetShadow5xl border-500-sm rounded-[2vh]">
            <h5 className="text-cyan-300 textShadow">{heading}</h5>
            <Wrap className="justify-evenly py-1vh ">
              {items.map((item, index) => (
                <Box className="px-1.5vh py-0.1vh bg-700-linear6op25 border-500-sm shadowNarrowLooser rounded-[3vh]">
                  <Text key={index}>{item}</Text>
                </Box>
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
