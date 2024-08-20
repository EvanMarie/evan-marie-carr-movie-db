import { useState } from "react";
import { motion } from "framer-motion";
import { HiArrowsExpand } from "react-icons/hi";
import Modal from "./modal";
import VStack from "./vStack";
import FlexFull from "./flexFull";
import Button from "./button";
import { CloseIcon, ExpandIcon, imageFallback } from "styles";
import Center from "./center";
import BouncingDots from "./bouncingDots";
import Icon from "./icon";
import Image from "./image";
import Flex from "./flex";
import AnimatedIconButton from "./animatedIconButton";
import Box from "./box";

export function ExpandableImage(image: { src: string; caption: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      <Flex className="relative w-fit h-fit">
        <motion.div
          className="absolute -top-[1vh] -right-[1vh] bg-yellow-300 p-0.4vh border-900-sm shadowNarrowTight hover:bg-col-300 transition-300"
          onClick={() => setIsOpen(true)}
        >
          <Icon icon={ExpandIcon} iconClassName="text-col-900" />
        </motion.div>
        <Center className="w-60vw sm:w-50vw md:w-40vw border-980-md  shadowNarrowLoose rounded-[1.6vh] ">
          {isLoading && (
            <Center className="skeleton w-full h-full rounded-[1.5vh] text-transparent min-h-[40vh] bg-radial4 animate-pulse duration-500">
              <BouncingDots />
            </Center>
          )}
          <Image
            src={image.src || imageFallback}
            alt={image.caption}
            className={`w-full h-full rounded-[1.5vh] ${
              isLoading ? "hidden" : ""
            }`}
            onLoad={handleImageLoad}
          />
        </Center>
      </Flex>
      <Modal
        isOpen={isOpen}
        showBottomClose={false}
        showTopClose={false}
        modalSize="w-fit h-fit"
        setModalOpen={setIsOpen}
        onClose={() => setIsOpen(false)}
      >
        <VStack gap="gap-3vh" className="p-1vh">
          <Box className="border-900-md shadowNarrowLooser rounded-[1.2vh]">
            <Image
              src={image.src}
              alt={image.caption}
              objectFit="contain"
              className="rounded-[1.1vh] max-w-90vw max-h-[90svh] "
            />
          </Box>

          <FlexFull className="justify-center">
            <AnimatedIconButton
              text="close"
              iconLeft={CloseIcon}
              onClick={() => setIsOpen(false)}
            />
          </FlexFull>
        </VStack>
      </Modal>
    </>
  );
}
