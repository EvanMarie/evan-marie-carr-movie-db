import { NavLink } from "@remix-run/react";
import { motion, stagger } from "framer-motion";
import HStack from "./hStack";
import Icon from "./icon";
import Text from "./text";

export default function AnimatedIconButton({
  link,
  onClick,
  type,
  target,
  iconLeft,
  iconRight,
  text,
  isActive,
  isDisabled,
  iconClassName,
  iconRotation = "group-hover:rotate-90",
  className,
  buttonPadding = "px-0.5vh sm:px-0.7vh",
  buttonSize = "normal",
}: {
  link?: string;
  onClick?: () => void;
  type?: "submit" | "button";
  target?: string;
  iconLeft?: any;
  iconRight?: any;
  iconClassName?: string;
  iconRotation?: string;
  text: string;
  isDisabled?: boolean;
  isActive?: boolean;
  className?: string;
  buttonPadding?: string;
  buttonSize?: "small" | "normal";
}) {
  const baseClassName = `bg-yellow-300 hover:bg-yellow-400 text-col-900 text-stroke-8-900
bg-gradient-to-r from-yellow-300/80 via-yellow-400/80 to-yellow-300/80 shadowNarrowTight border-900-md transition-300`;
  const smallClassName = `h-[3vh] text-[1.6vh] md:text-[1.8vh] leading-tight ${buttonPadding}`;
  const normalClassName = `h-3.2vh md:h-[3.5svh] text-[1.8vh] md:text-[2vh] leading-tight ${buttonPadding}`;
  const displayClassName = `${baseClassName} ${
    buttonSize === "small" ? smallClassName : normalClassName
  } ${className}`;

  const normalIconClassName = "text-[2.2vh] md:text-[2.5vh]";
  const smallIconClassName = "text-[2vh] md:text-[2.3vh]";
  const displayIconClassName = `${
    buttonSize === "small" ? smallIconClassName : normalIconClassName
  } ${iconClassName}`;

  return (
    <>
      {link ? (
        <NavLink
          to={link}
          className={`group ${isDisabled && "opacity-30"}`}
          target={target}
          rel="prefetch"
        >
          <motion.button
            disabled={isDisabled}
            whileHover={{
              scale: isActive ? 1 : 1.02,
              transition: { duration: 0.4 },
            }}
            whileTap={{
              scale: 0.9,
              transition: { duration: 0.4 },
            }}
          >
            <HStack
              className={`${
                isDisabled ? "hover:cursor-default" : "hover:cursor-pointer"
              }  ${displayClassName} items-center`}
              gap="gap-0.5vh"
            >
              {iconLeft && (
                <Icon
                  icon={iconLeft}
                  hoverCursor={
                    isDisabled ? "hover:cursor-default" : "hover:cursor-pointer"
                  }
                  iconClassName={displayIconClassName}
                  containerClassName={`${
                    !isDisabled && iconRotation
                  } transition-400`}
                />
              )}
              {text && <Text>{text}</Text>}
              {iconRight && (
                <Icon
                  icon={iconRight}
                  hoverCursor={
                    isDisabled ? "hover:cursor-default" : "hover:cursor-pointer"
                  }
                  iconClassName={displayIconClassName}
                  containerClassName={`${
                    !isDisabled && iconRotation
                  } transition-400`}
                />
              )}
            </HStack>
          </motion.button>
        </NavLink>
      ) : (
        <motion.button
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.4 },
          }}
          whileTap={{
            scale: 0.9,
            transition: { duration: 0.4 },
          }}
          className={`"group" ${isDisabled && "opacity-30"}`}
          onClick={onClick}
          type={type}
        >
          <HStack
            className={`${
              isDisabled ? "hover:cursor-default" : "hover:cursor-pointer"
            }  ${displayClassName} items-center`}
            gap="gap-0.5vh"
          >
            {iconLeft && (
              <Icon
                hoverCursor={
                  isDisabled ? "hover:cursor-default" : "hover:cursor-pointer"
                }
                icon={iconLeft}
                iconClassName={displayIconClassName}
                containerClassName={`${
                  !isDisabled && iconRotation
                } transition-400`}
              />
            )}
            {text && <Text>{text}</Text>}
            {iconRight && (
              <Icon
                hoverCursor={
                  isDisabled ? "hover:cursor-default" : "hover:cursor-pointer"
                }
                icon={iconRight}
                iconClassName={displayIconClassName}
                containerClassName={`${
                  !isDisabled && iconRotation
                } transition-400`}
              />
            )}
          </HStack>
        </motion.button>
      )}
    </>
  );
}
