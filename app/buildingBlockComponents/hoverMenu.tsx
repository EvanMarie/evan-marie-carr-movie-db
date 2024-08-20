import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "@remix-run/react";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import Flex from "./flex";
import HStack from "./hStack";
import Text from "./text";
import Icon from "./icon";
import FlexFull from "./flexFull";
import VStackFull from "./vStackFull";

export default function HoverMenu({
  children,
  mainText,
  textSize = "text-sm md:text-md",
  className,
  bgSettings = "bg-yellow-300",
  textColor = "text-col-900",
  iconSize = "text-lg",
  childLinkPadding = "px-[2vh] py-[0.5vh]",
  collapsedIcon = BiChevronRight,
  expandedIcon = BiChevronDown,
  expandedIconRotation = "rotate-0",
  align = "right",
  topPosition = "top-full",
}: {
  children?: React.ReactNode;
  mainText?: string;
  textSize?: string;
  iconSize?: string;
  className?: string;
  bgSettings?: string;
  textColor?: string;
  childLinkPadding?: string;
  expandedIconRotation?: string;
  align?: "left" | "right";
  topPosition?: string;
  collapsedIcon?: React.ComponentType<{
    className?: string;
    tabIndex?: number;
  }>;
  expandedIcon?: React.ComponentType<{ className?: string; tabIndex?: number }>;
}) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = useLocation().pathname;
  const isClasses =
    pathname.includes("/classes") || pathname.includes("/student/Teacher");

  return (
    <Flex className={className}>
      <div
        className={`flex flex-col relative items-start ${bgSettings} ${
          isDropDownOpen ? "rounded-b-none " : ""
        }`}
        style={{ zIndex: 100 }}
        onMouseEnter={() => setIsDropDownOpen(true)}
        onMouseLeave={() => setIsDropDownOpen(false)}
        ref={containerRef}
      >
        <Flex
          className={`w-full justify-center shadowNarrowTight ${
            isDropDownOpen ? "rounded-b-none " : "border-900-sm"
          }`}
        >
          <HStack
            className={`md:gap-2vh  ${childLinkPadding} hover:cursor-pointer items-center justify-between ${
              isDropDownOpen ? "rounded-b-none" : ""
            }  `}
          >
            <Text
              className={`${textSize} ${
                isClasses ? "text-col-200 font-semibold textShadow" : textColor
              }`}
            >
              {mainText}
            </Text>
            <Icon
              hoverCursor="hover:cursor-pointer"
              icon={isDropDownOpen ? expandedIcon : collapsedIcon}
              iconClassName={`${iconSize} ${textColor} ${
                isDropDownOpen
                  ? `transform ${expandedIconRotation} transition-transform duration-500`
                  : `transform rotate-0 transition-transform duration-500`
              }`}
            />
          </HStack>
        </Flex>
        <AnimatePresence>
          {isDropDownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.4 }}
              className={`absolute w-full ${topPosition} shadowNarroLoose ${
                align === "left" ? "left-0" : "right-0"
              } w-auto`}
              style={{ zIndex: 200 }}
            >
              <FlexFull
                className={`${bgSettings} ${textColor} rounded-t-none w-full overflow-y-auto transition-500 justify-start`}
              >
                <VStackFull
                  gap="gap-[0px]"
                  className={`h-fit ${textColor} transition-500 rounded-t-none mainInset items-start`}
                >
                  {children}
                </VStackFull>
              </FlexFull>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Flex>
  );
}
