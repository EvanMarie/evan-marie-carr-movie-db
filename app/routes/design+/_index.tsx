/* eslint-disable react/no-unescaped-entities */
import {
  textShadows,
  allColors,
  allColorsRGB,
  gradients,
  col100Bgs,
  col200Bgs,
  col300Bgs,
  col400Bgs,
  col500Bgs,
  col600Bgs,
  col700Bgs,
  col800Bgs,
  col900Bgs,
  shadowsDarkBack,
  shadowsLightBack,
  textStrokeDarkBg,
  textStrokeLightBg,
  textExamples,
  transitions,
  colors100,
} from "./data";
import { GoSmiley } from "react-icons/go";
import { useLocation } from "@remix-run/react";
import { NavLink } from "react-router-dom";
import Transition from "~/buildingBlockComponents/transition";
import FlexFull from "~/buildingBlockComponents/flexFull";
import Wrap from "~/buildingBlockComponents/wrap";
import NavIconButton from "~/buildingBlockComponents/navLinkIconButton";
import VStackFull from "~/buildingBlockComponents/vStackFull";
import Heading from "~/buildingBlockComponents/headingText";
import Button from "~/buildingBlockComponents/button";
import IconButton from "~/buildingBlockComponents/iconButton";
import Box from "~/buildingBlockComponents/box";
import Text from "~/buildingBlockComponents/text";
import Flex from "~/buildingBlockComponents/flex";
import { HomeIcon } from "styles";

interface CustomNavLinkProps {
  to: string;
  linkText?: string;
  textClassName?: string;
  activeStyles?: string;
  inactiveStyles?: string;
  useHash?: boolean;
  useActive?: boolean;
  className?: string;
}

export function CustomNavLink({
  to,
  linkText,
  textClassName = "text-col-800 text-stroke-6-800 hover:textGlow hover:transition-300",
  className,
}: CustomNavLinkProps) {
  const hash = useLocation().hash;

  return (
    <Box className={className}>
      <NavLink to={to} className={className}>
        <Text className={textClassName}>{linkText}</Text>
      </NavLink>
    </Box>
  );
}

export function SectionHeading({
  id,
  heading,
}: {
  id: string;
  heading: string;
}) {
  return (
    <>
      <div id={id} className="h-[5.5vh] xl:h-[3.5vh] text-transparent">
        This
      </div>
      <Flex className="w-full justify-center pt-[2vh] pb-[1vh]">
        <Heading
          color="text-white text-stroke-9-100"
          shadow="textShadow"
          text={heading}
          layout="text-insane-loose"
          className="px-[2vh]"
        />
      </Flex>
    </>
  );
}

export function TransformBg({ value }: { value: string }) {
  const parts = value.split(" ");
  const background = parts[0].replace("bg-col-", "bg-");
  const gradient = parts[1].replace("bg-", "");
  const backgroundCombo = String(`${background}-${gradient}`);

  return backgroundCombo;
}

export function StyleExampleBox({
  className,
  text,
}: {
  className: string;
  text: string;
}) {
  return <Flex className={`px-[1vh] py-[0.5vh] ${className}`}>{text}</Flex>;
}

export function StyledExampleWrap({
  bg = "bg-col-700",
  children,
}: {
  bg?: string;
  children: React.ReactNode;
}) {
  return (
    <Wrap
      className={`${bg} px-[1vh] py-[2vh] shadowNarrowNormal gap-y-[2vh] gap-x-[3vh] w-full justify-around`}
    >
      {children}
    </Wrap>
  );
}

export default function Design() {
  function TestBox({
    bg,
    children,
    w = "w-[16vh]",
  }: {
    bg: string;
    children: React.ReactNode;
    w?: string;
  }) {
    const isLightFont =
      bg.startsWith("bg-col-9") ||
      bg.startsWith("bg-col-800") ||
      bg.startsWith("bg-col-700") ||
      bg.startsWith("bg-col-600") ||
      bg.startsWith("bg-col-5");

    const isDarkFont =
      bg.startsWith("bg-col-1") ||
      bg.startsWith("bg-col-2") ||
      bg.startsWith("bg-col-3") ||
      bg.startsWith("bg-col-4");

    const fontColor = isLightFont
      ? `text-col-100  text-stroke-4-900 textShadow`
      : isDarkFont
      ? `text-col-900  text-stroke-4-900 lightTextShadow`
      : `text-col-100 textShadow`;

    return (
      <Flex
        className={`h-[5vh] ${w} font-bold ${bg} shadowNarrowNormal ${fontColor} justify-center items-center`}
      >
        <Text>{children}</Text>
      </Flex>
    );
  }

  return (
    <Transition className="w-full h-full justify-center overflow-y-auto">
      <FlexFull className="h-full overflow-y-auto justify-center">
        <FlexFull className="fixed top-0 left-0 p-[1vh] bg-col-200 z-10 shadowWideLooser rounded-none">
          <Wrap className="w-full gap-x-[5vh] gap-y-0.5vh justify-around">
            <NavIconButton icon={HomeIcon} type="smallNormal" to="/" />
            <CustomNavLink to="#colorscheme" linkText="Colors" useHash />
            <CustomNavLink to="#rgb" linkText="RBG" useHash />
            <CustomNavLink to="#gradients" linkText="Gradients" />
            <CustomNavLink
              to="#complexbackgrounds"
              linkText="Complex Backgrounds"
            />
            <CustomNavLink to="#buttons" linkText="Buttons" />
            <CustomNavLink to="#transitions" linkText="Transitions" />
            <CustomNavLink to="#shadow" linkText="Shadows" />
            <CustomNavLink to="#text" linkText="Text" />
          </Wrap>
        </FlexFull>
        <VStackFull className="h-fit px-[2vh] py-1vh" gap="gap-[2vh]">
          <VStackFull gap="gap-[1vh]">
            <SectionHeading id="colorscheme" heading="Color Scheme" />
            <StyledExampleWrap bg="bg-white">
              {allColors.map((color: string, index: number) => (
                <TestBox key={index} bg={color}>
                  {" "}
                  {color}
                </TestBox>
              ))}
            </StyledExampleWrap>
            <StyledExampleWrap>
              {colors100.map((color: string, index: number) => (
                <TestBox key={index} bg={color}>
                  {" "}
                  {color}
                </TestBox>
              ))}
            </StyledExampleWrap>

            <SectionHeading id="rgb" heading="RBG Equivalents" />
            <StyledExampleWrap bg="bg-white">
              {allColorsRGB.map(
                (color: { code: string; rgb: string }, index: number) => (
                  <TestBox key={index} bg={color.code} w="w-[30vh]">
                    {" "}
                    {color.rgb}
                  </TestBox>
                )
              )}
            </StyledExampleWrap>
          </VStackFull>
          <VStackFull className="h-fit" gap="gap-[2vh]">
            <SectionHeading id="gradients" heading="Gradients & Opacities" />
            <StyledExampleWrap bg="bg-white">
              {gradients.map((gradient: string, index: number) => (
                <TestBox key={index} bg={gradient} w="w-[24vh]">
                  {" "}
                  {gradient}
                </TestBox>
              ))}
            </StyledExampleWrap>
          </VStackFull>
          <VStackFull className="h-fit" gap="gap-[2vh]">
            <SectionHeading
              id="complexbackgrounds"
              heading="Complex Backgrounds"
            />
            <Heading
              isCursive={false}
              color="text-col-100"
              shadow="textShadow"
              layout="text-lg-normal"
              text="col-100 gradient combinations"
            />

            <StyledExampleWrap>
              {Object.values(col100Bgs).map(
                (background: string, index: number) => (
                  <TestBox key={index} bg={background} w="w-[24vh]">
                    <TransformBg value={background} />
                  </TestBox>
                )
              )}
            </StyledExampleWrap>
            <Heading
              isCursive={false}
              color="text-col-100"
              shadow="textShadow"
              layout="text-lg-normal"
              text="col-100 gradient combinations"
            />

            <StyledExampleWrap>
              {Object.values(col200Bgs).map(
                (background: string, index: number) => (
                  <TestBox key={index} bg={background} w="w-[24vh]">
                    {" "}
                    <TransformBg value={background} />
                  </TestBox>
                )
              )}
            </StyledExampleWrap>
            <Heading
              isCursive={false}
              color="text-col-100"
              shadow="textShadow"
              layout="text-lg-normal"
              text="col-200 gradient combinations"
            />

            <StyledExampleWrap>
              {Object.values(col300Bgs).map(
                (background: string, index: number) => (
                  <TestBox key={index} bg={background} w="w-[24vh]">
                    {" "}
                    <TransformBg value={background} />
                  </TestBox>
                )
              )}
            </StyledExampleWrap>
            <Heading
              isCursive={false}
              color="text-col-100"
              shadow="textShadow"
              layout="text-lg-normal"
              text="col-300 gradient combinations"
            />

            <StyledExampleWrap>
              {Object.values(col100Bgs).map(
                (background: string, index: number) => (
                  <TestBox key={index} bg={background} w="w-[24vh]">
                    <TransformBg value={background} />
                  </TestBox>
                )
              )}
            </StyledExampleWrap>
            <Heading
              isCursive={false}
              color="text-col-100"
              shadow="textShadow"
              layout="text-lg-normal"
              text="col-400 gradient combinations"
            />

            <StyledExampleWrap>
              {Object.values(col400Bgs).map(
                (background: string, index: number) => (
                  <TestBox key={index} bg={background} w="w-[24vh]">
                    <TransformBg value={background} />
                  </TestBox>
                )
              )}
            </StyledExampleWrap>
            <Heading
              isCursive={false}
              color="text-col-100"
              shadow="textShadow"
              layout="text-lg-normal"
              text="col-500 gradient combinations"
            />

            <StyledExampleWrap>
              {Object.values(col500Bgs).map(
                (background: string, index: number) => (
                  <TestBox key={index} bg={background} w="w-[24vh]">
                    <TransformBg value={background} />
                  </TestBox>
                )
              )}
            </StyledExampleWrap>
            <Heading
              isCursive={false}
              color="text-col-100"
              shadow="textShadow"
              layout="text-lg-normal"
              text="col-600 gradient combinations"
            />

            <StyledExampleWrap>
              {Object.values(col600Bgs).map(
                (background: string, index: number) => (
                  <TestBox key={index} bg={background} w="w-[24vh]">
                    <TransformBg value={background} />
                  </TestBox>
                )
              )}
            </StyledExampleWrap>
            <Heading
              isCursive={false}
              color="text-col-100"
              shadow="textShadow"
              layout="text-lg-normal"
              text="col-700 gradient combinations"
            />

            <StyledExampleWrap bg="bg-col-500">
              {Object.values(col700Bgs).map(
                (background: string, index: number) => (
                  <TestBox key={index} bg={background} w="w-[24vh]">
                    <TransformBg value={background} />
                  </TestBox>
                )
              )}
            </StyledExampleWrap>
            <Heading
              isCursive={false}
              color="text-col-100"
              shadow="textShadow"
              layout="text-lg-normal"
              text="col-800 gradient combinations"
            />

            <StyledExampleWrap>
              {Object.values(col800Bgs).map(
                (background: string, index: number) => (
                  <TestBox key={index} bg={background} w="w-[24vh]">
                    <TransformBg value={background} />
                  </TestBox>
                )
              )}
            </StyledExampleWrap>
            <Heading
              isCursive={false}
              color="text-col-100"
              shadow="textShadow"
              layout="text-lg-normal"
              text="col-900 gradient combinations"
            />

            <StyledExampleWrap>
              {Object.values(col900Bgs).map(
                (background: string, index: number) => (
                  <TestBox key={index} bg={background} w="w-[24vh]">
                    <TransformBg value={background} />
                  </TestBox>
                )
              )}
            </StyledExampleWrap>
          </VStackFull>
          <VStackFull className="w-90% pb-[3vh]">
            <SectionHeading id="buttons" heading="Buttons" />
            <StyledExampleWrap bg="bg-col-200">
              <Button buttonText="Normal" />{" "}
              <Button type="smallNormal" buttonText="NormalButton" />
              <Button type="negative" buttonText="Negative" />
              <Button type="smallNegative" buttonText="Negative Small" />
              <Button type="unstyled" buttonText="Unstyled" />
              <Button type="smallUnstyled" buttonText="Unstyled Small" />
              <Button buttonText="Normal Icon Left" iconLeft={GoSmiley} />
              <Button
                buttonText="Small Icon Right"
                iconRight={GoSmiley}
                type="smallNormal"
              />
              <Button
                buttonText="Negative Icon Left"
                type="negative"
                iconLeft={GoSmiley}
              />
              <Button
                buttonText="Small Negative Icon Right"
                type="smallNegative"
                iconRight={GoSmiley}
              />
              <IconButton icon={GoSmiley} />{" "}
              <IconButton type="smallNormal" icon={GoSmiley} />
              <IconButton type="negative" icon={GoSmiley} />
              <IconButton type="smallNegative" icon={GoSmiley} />
              <IconButton type="unstyled" icon={GoSmiley} />
              <IconButton type="smallUnstyled" icon={GoSmiley} />
            </StyledExampleWrap>
          </VStackFull>
          <VStackFull>
            <SectionHeading id="transitions" heading="Transitions" />

            <StyledExampleWrap>
              {transitions.map((transition) => (
                <StyleExampleBox
                  key={transition}
                  className={`${transition} bg-col-200 hover:bg-col-900 text-col-900
              hover:text-col-100 shadowNarrowNormal`}
                  text={`className='${transition}'`}
                />
              ))}
            </StyledExampleWrap>
            <SectionHeading id="shadow" heading="Shadows" />
            <VStackFull>
              {" "}
              <StyledExampleWrap bg="bg-col-100">
                {shadowsLightBack.map((shadow) => (
                  <Box className={`${shadow} bg-col-500`} key={shadow}>
                    <Text className="p-[1vh]">{shadow}</Text>
                  </Box>
                ))}
              </StyledExampleWrap>
              <StyledExampleWrap bg="bg-col-800">
                {shadowsDarkBack.map((shadow) => (
                  <Box className={`${shadow}`} key={shadow}>
                    <Text className="text-col-100 p-[1vh]">{shadow}</Text>
                  </Box>
                ))}
              </StyledExampleWrap>
            </VStackFull>
            <SectionHeading id="text" heading="Text" />
            <StyledExampleWrap>
              {textExamples.map((textExample, index) => (
                <Box
                  key={index}
                  className="bg-col-500 h-fit text-col-100 shadowNarrowNormal px-[1vh]"
                >
                  <Text className={`${textExample} `}>{textExample}</Text>
                </Box>
              ))}
            </StyledExampleWrap>

            <SectionHeading id="" heading="Text Shadow" />
            <StyledExampleWrap>
              {textShadows.map((shadow, index) => (
                <Box
                  key={index}
                  className={
                    shadow === "textFog"
                      ? "text-col-100 bg-col-200 shadowNarrowNormal p-[1vh]"
                      : "text-col-900 bg-col-200 shadowNarrowNormal p-[1vh]"
                  }
                >
                  <Text className={`${shadow} `}>{shadow}</Text>
                </Box>
              ))}
            </StyledExampleWrap>
            <SectionHeading id="" heading="Text Stroke" />
            <StyledExampleWrap>
              {textStrokeDarkBg.map((combo, index) => (
                <Box key={index} className="font-bold">
                  <Text className={`${combo} text-xxl-normal text-col-700`}>
                    {combo}
                  </Text>
                </Box>
              ))}
            </StyledExampleWrap>

            <StyledExampleWrap bg="bg-col-300">
              {textStrokeLightBg.map((combo, index) => (
                <Box key={index} className="font-bold">
                  <Text className={`${combo} text-xxl-normal text-col-300`}>
                    {combo}
                  </Text>
                </Box>
              ))}
            </StyledExampleWrap>
          </VStackFull>
        </VStackFull>
      </FlexFull>
    </Transition>
  );
}
